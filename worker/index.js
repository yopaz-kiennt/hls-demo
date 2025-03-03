const puppeteer = require("puppeteer");
const amqp = require("amqplib/callback_api");
const dayjs = require("dayjs");
const fs = require("fs");
const mysql = require("mysql2/promise");
const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

(async () => {
  // CONNECT TO DB
  let dbConnection;
  await connectToDB();
  async function connectToDB() {
    dbConnection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      database: process.env.DB_DATABASE,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
    });
  }

  // START QUEUE
  listenFromQueue();
  function listenFromQueue() {
    const userName = process.env.RABBITMQ_USER;
    const password = process.env.RABBITMQ_PASSWORD;
    const hostName = process.env.RABBITMQ_HOST;
    const portNumber = process.env.RABBITMQ_PORT;
    const virtualHost = process.env.RABBITMQ_VHOST;
    const queue = process.env.RABBITMQ_QUEUE_NAME;

    amqp.connect(
      `amqp://${userName}:${password}@${hostName}:${portNumber}/${virtualHost}`,
      function (error0, connection) {
        if (error0) {
          throw error0;
        }

        connection.createChannel(function (error1, channel) {
          if (error1) {
            throw error1;
          }

          channel.assertQueue(queue, {
            durable: true,
          });
          console.log(
            " [*] Waiting for messages in %s. To exit press CTRL+C",
            queue,
          );

          channel.consume(
            queue,
            function (msg) {
              console.log(" [x] Received %s", msg.content.toString());
              apply(msg.content.toString());
            },
            {
              noAck: true,
            },
          );
        });
      },
    );
  }

  const ApplicationStatus = {
    SUCCESS: "success",
    ERROR: "error",
    PENDING: "pending",
    PROCESSING: "processing",
  };

  const ApplicationPaymentStatus = {
    PAID: "paid",
    UNPAID: "unpaid",
    NO_PAYMENT_REQUIRED: "no_payment_required",
  };

  // CALL ETA
  async function apply(msg) {
    let res = ApplicationStatus.ERROR;
    let jobId;
    let application;

    try {
      jobId = getJobId(msg);
      application = await handleApplicationFromDB(jobId);
      console.log(application); // TODO: remove after testing
    } catch (err) {
      console.error(err.stack);
    }

    if (application) {
      let workerLog = null;
      let screenshots = null;
      let browser;

      try {
        browser = await initBrowser();
        const page = await initPage(browser);
        await step1(page, application);

        // Are you applying on behalf of someone? (required)
        // Yes
        if (application.is_representative === 0) {
          await step2(page, application);
        }

        await step3(page, application);
        await step4(page, jobId);
        // TODO: payment

        res = ApplicationStatus.SUCCESS;
      } catch (err) {
        console.error(err.stack);

        workerLog = err.stack;
      }

      if (browser) {
        browser.close();
      }

      try {
        screenshots = getScreenshotPaths(application.id);
      } catch (err) {
        console.error(err.stack);

        workerLog = workerLog ?? err.stack;
      }

      try {
        await updataApplicationToDB(application.id, {
          screenshots: screenshots,
          workerLog: workerLog,
          status: res,
        });
      } catch (err) {
        console.error(err);
      }
    }

    return res;
  }

  function getJobId(msg) {
    return JSON.parse(msg).id;
  }

  async function handleApplicationFromDB(applicationId) {
    const updateSql =
      "UPDATE `applications` SET `status` = ? WHERE `id` = ? AND `status` = ? AND `payment_status` = ?";
    const updateValues = [
      ApplicationStatus.PROCESSING,
      applicationId,
      ApplicationStatus.PENDING,
      ApplicationPaymentStatus.PAID,
    ];
    const [updateResult] = await dbConnection.execute(updateSql, updateValues);

    if (updateResult.changedRows === 0) {
      throw new Error(`No application found with id ${applicationId}`);
    }

    const selectSql = "SELECT * FROM `applications` WHERE `id` = ? LIMIT 1";
    const selectValues = [applicationId];
    const [selectRows] = await dbConnection.execute(selectSql, selectValues);

    if (selectRows.length === 0) {
      throw new Error(`No application found with id ${applicationId}`);
    }

    return selectRows[0];
  }

  async function initBrowser() {
    return await puppeteer.launch({
      headless: true,
    });
  }

  async function initPage(browser) {
    const page = await browser.newPage();
    await page.setViewport({
      width: 1024,
      height: 0,
    });

    return page;
  }

  async function step1(page, application) {
    // https://onlineservices-servicesenligne.cic.gc.ca/eta/welcome?lang=en#/

    try {
      await page.goto(
        "https://onlineservices-servicesenligne.cic.gc.ca/eta/welcome?lang=en#/",
        { waitUntil: "networkidle0" },
      );

      if (page.url() === "https://ircc.canada.ca/outage-interruption.asp#/") {
        throw new Error("Outage interruption");
      }

      // Are you applying on behalf of someone? (required)
      await page.waitForSelector("#welcome_isRepresentative");

      if (application.is_representative === 1) {
        // No
        await page.select("#welcome_isRepresentative", "1");
        await sleep(300);
      } else {
        // Yes
        await page.select("#welcome_isRepresentative", "0");
        await sleep(300);

        // Are you applying on behalf of a minor child? (required)
        await page.waitForSelector("#welcome_isApplyingOnBehalfOfMinorChild");
        await page.select(
          "#welcome_isApplyingOnBehalfOfMinorChild",
          `${application.is_applying_for_minor}`,
        );
        await sleep(300);
      }

      await page.waitForSelector(".btn-next");
      await screenshot(page, application.id, "step1", false);

      await page.click(".btn-next");
      await page.waitForNetworkIdle();
    } catch (err) {
      await screenshot(page, application.id, "step1", true);

      throw new Error(err.stack);
    }
  }

  async function step2(page, application) {
    // https://onlineservices-servicesenligne.cic.gc.ca/eta/welcome?lang=en#/representative

    try {
      // -- Parent/guardian or representative details --

      // I am (required)
      // A family member or friend
      if (application.representative_relationship === 0) {
        await step2dot1(page, application);
      }

      // A member of a non-governmental or religious organization
      if (application.representative_relationship === 1) {
        await step2dot2(page, application);
      }

      // A member of the College of Immigration and Citizenship Consultants (CICC)
      if (application.representative_relationship === 2) {
        await step2dot3(page, application);
      }

      // A member of a Canadian provincial or territorial law society
      if (application.representative_relationship === 3) {
        await step2dot4(page, application);
      }

      // A member of the Chambre des notaires du Québec
      if (application.representative_relationship === 4) {
        await step2dot5(page, application);
      }

      // A travel agent
      if (application.representative_relationship === 5) {
        await step2dot6(page, application);
      }

      // Telephone number (required)
      await page.waitForSelector("#representative_phoneNumber");
      await page.type(
        "#representative_phoneNumber",
        application.data.representative.phoneNumber,
      );
      await sleep(300);

      // Fax number
      await page.waitForSelector("#representative_faxNumber");
      await page.type(
        "#representative_faxNumber",
        application.data.representative.faxNumber ?? "",
      );
      await sleep(300);

      // Email address
      await page.waitForSelector("#representative_emailAddress");
      await page.type(
        "#representative_emailAddress",
        application.data.representative.emailAddress ?? "",
      );
      await sleep(300);

      // Representative's declaration (required)
      await page.waitForSelector(
        "#representative_declareContactAndInformationIsTruthy",
      );
      await page.click("#representative_declareContactAndInformationIsTruthy");
      await sleep(300);

      // Representative's authorization (required)
      await page.waitForSelector("#representative_understandAndAccept");
      await page.click("#representative_understandAndAccept");
      await sleep(300);

      const currentUrl = page.url();

      await page.waitForSelector(".btn-next");
      await screenshot(page, application.id, "step2", false);
      await page.click(".btn-next");
      await page.waitForNetworkIdle();

      if (currentUrl === page.url()) {
        await screenshot(page, application.id, "step2", true);
      }
    } catch (err) {
      await screenshot(page, application.id, "step2", true);

      throw new Error(err.stack);
    }
  }

  async function step2dot1(page, application) {
    // I am (required)
    await page.waitForSelector("#representative_representativeRelationship");
    // A family member or friend
    await page.select("#representative_representativeRelationship", "0");
    await sleep(300);

    // Are you being paid to represent the applicant and complete the form on their behalf? (required)
    await page.waitForSelector("#representative_representativeCompensated");
    await page.select(
      "#representative_representativeCompensated",
      application.data.representative.representativeCompensated,
    );
    await sleep(300);

    // Surname(s) / last name(s) (required)
    await page.waitForSelector("#representative_familyName");
    await page.type(
      "#representative_familyName",
      application.data.representative.lastName,
    );
    await sleep(300);

    // Given name(s) / first name(s) (required)
    await page.waitForSelector("#representative_firstName");
    await page.type(
      "#representative_firstName",
      application.data.representative.firstName,
    );
    await sleep(300);

    // Mailing address (required)
    await page.waitForSelector("#representative_mailingAddress");
    await page.type(
      "#representative_mailingAddress",
      application.data.representative.mailingAddress,
    );
    await sleep(300);
  }

  async function step2dot2(page, application) {
    // I am (required)
    await page.waitForSelector("#representative_representativeRelationship");
    // A member of a non-governmental or religious organization
    await page.select("#representative_representativeRelationship", "1");
    await sleep(300);

    // Are you being paid to represent the applicant and complete the form on their behalf? (required)
    await page.waitForSelector("#representative_representativeCompensated");
    await page.select(
      "#representative_representativeCompensated",
      application.data.representative.representativeCompensated,
    );
    await sleep(300);

    // Surname(s) / last name(s) (required)
    await page.waitForSelector("#representative_familyName");
    await page.type(
      "#representative_familyName",
      application.data.representative.lastName,
    );
    await sleep(300);

    // Given name(s) / first name(s) (required)
    await page.waitForSelector("#representative_firstName");
    await page.type(
      "#representative_firstName",
      application.data.representative.firstName,
    );
    await sleep(300);

    // Name of firm, organization (required)
    await page.waitForSelector("#representative_organizationName");
    await page.type(
      "#representative_organizationName",
      application.data.representative.organizationName,
    );
    await sleep(300);

    // Mailing address (required)
    await page.waitForSelector("#representative_mailingAddress");
    await page.type(
      "#representative_mailingAddress",
      application.data.representative.mailingAddress,
    );
    await sleep(300);
  }

  async function step2dot3(page, application) {
    // I am (required)
    await page.waitForSelector("#representative_representativeRelationship");
    // A member of the College of Immigration and Citizenship Consultants (CICC)
    await page.select("#representative_representativeRelationship", "2");
    await sleep(300);

    // Are you being paid to represent the applicant and complete the form on their behalf? (required)
    await page.waitForSelector("#representative_representativeCompensated");
    await page.select(
      "#representative_representativeCompensated",
      application.data.representative.representativeCompensated,
    );
    await sleep(300);

    // Membership ID number (required)
    await page.waitForSelector("#representative_membershipIdNumber");
    await page.type(
      "#representative_membershipIdNumber",
      application.data.representative.membershipIdNumber,
    );
    await sleep(300);

    // Which province or territory? (required)
    await page.waitForSelector("#representative_province");
    await page.type(
      "#representative_province",
      application.data.representative.province,
    );
    await sleep(300);

    // Surname(s) / last name(s) (required)
    await page.waitForSelector("#representative_familyName");
    await page.type(
      "#representative_familyName",
      application.data.representative.lastName,
    );
    await sleep(300);

    // Given name(s) / first name(s) (required)
    await page.waitForSelector("#representative_firstName");
    await page.type(
      "#representative_firstName",
      application.data.representative.firstName,
    );
    await sleep(300);

    // Name of firm, organization (required)
    await page.waitForSelector("#representative_organizationName");
    await page.type(
      "#representative_organizationName",
      application.data.representative.organizationName,
    );
    await sleep(300);

    // Mailing address (required)
    await page.waitForSelector("#representative_mailingAddress");
    await page.type(
      "#representative_mailingAddress",
      application.data.representative.mailingAddress,
    );
    await sleep(300);

    // Postal code (required)
    await page.waitForSelector("#representative_postalCodeZip");
    await page.type(
      "#representative_postalCodeZip",
      application.data.representative.postalCodeZip,
    );
    await sleep(300);
  }

  async function step2dot4(page, application) {
    // I am (required)
    await page.waitForSelector("#representative_representativeRelationship");
    // A member of a Canadian provincial or territorial law society
    await page.select("#representative_representativeRelationship", "3");
    await sleep(300);

    // Are you being paid to represent the applicant and complete the form on their behalf? (required)
    await page.waitForSelector("#representative_representativeCompensated");
    await page.select(
      "#representative_representativeCompensated",
      application.data.representative.representativeCompensated,
    );
    await sleep(300);

    // Membership ID number (required)
    await page.waitForSelector("#representative_membershipIdNumber");
    await page.type(
      "#representative_membershipIdNumber",
      application.data.representative.membershipIdNumber,
    );
    await sleep(300);

    // Which province or territory? (required)
    await page.waitForSelector("#representative_province");
    await page.type(
      "#representative_province",
      application.data.representative.province,
    );
    await sleep(300);

    // Surname(s) / last name(s) (required)
    await page.waitForSelector("#representative_familyName");
    await page.type(
      "#representative_familyName",
      application.data.representative.lastName,
    );
    await sleep(300);

    // Given name(s) / first name(s) (required)
    await page.waitForSelector("#representative_firstName");
    await page.type(
      "#representative_firstName",
      application.data.representative.firstName,
    );
    await sleep(300);

    // Name of firm, organization (required)
    await page.waitForSelector("#representative_organizationName");
    await page.type(
      "#representative_organizationName",
      application.data.representative.organizationName,
    );
    await sleep(300);

    // Mailing address (required)
    await page.waitForSelector("#representative_mailingAddress");
    await page.type(
      "#representative_mailingAddress",
      application.data.representative.mailingAddress,
    );
    await sleep(300);

    // Postal code (required)
    await page.waitForSelector("#representative_postalCodeZip");
    await page.type(
      "#representative_postalCodeZip",
      application.data.representative.postalCodeZip,
    );
    await sleep(300);
  }

  async function step2dot5(page, application) {
    // I am (required)
    await page.waitForSelector("#representative_representativeRelationship");
    // A member of the Chambre des notaires du Québec
    await page.select("#representative_representativeRelationship", "4");
    await sleep(300);

    // Are you being paid to represent the applicant and complete the form on their behalf? (required)
    await page.waitForSelector("#representative_representativeCompensated");
    await page.select(
      "#representative_representativeCompensated",
      application.data.representative.representativeCompensated,
    );
    await sleep(300);

    // Membership ID number (required)
    await page.waitForSelector("#representative_membershipIdNumber");
    await page.type(
      "#representative_membershipIdNumber",
      application.data.representative.membershipIdNumber,
    );
    await sleep(300);

    // Surname(s) / last name(s) (required)
    await page.waitForSelector("#representative_familyName");
    await page.type(
      "#representative_familyName",
      application.data.representative.lastName,
    );
    await sleep(300);

    // Given name(s) / first name(s) (required)
    await page.waitForSelector("#representative_firstName");
    await page.type(
      "#representative_firstName",
      application.data.representative.firstName,
    );
    await sleep(300);

    // Name of firm, organization (required)
    await page.waitForSelector("#representative_organizationName");
    await page.type(
      "#representative_organizationName",
      application.data.representative.organizationName,
    );
    await sleep(300);

    // Mailing address (required)
    await page.waitForSelector("#representative_mailingAddress");
    await page.type(
      "#representative_mailingAddress",
      application.data.representative.mailingAddress,
    );
    await sleep(300);
  }

  async function step2dot6(page, application) {
    // I am (required)
    await page.waitForSelector("#representative_representativeRelationship");
    // A travel agent
    await page.select("#representative_representativeRelationship", "5");
    await sleep(300);

    // Are you being paid to represent the applicant and complete the form on their behalf? (required)
    await page.waitForSelector("#representative_representativeCompensated");
    await page.select(
      "#representative_representativeCompensated",
      application.data.representative.representativeCompensated,
    );
    await sleep(300);

    // Surname(s) / last name(s) (required)
    await page.waitForSelector("#representative_familyName");
    await page.type(
      "#representative_familyName",
      application.data.representative.lastName,
    );
    await sleep(300);

    // Given name(s) / first name(s) (required)
    await page.waitForSelector("#representative_firstName");
    await page.type(
      "#representative_firstName",
      application.data.representative.firstName,
    );
    await sleep(300);

    // Name of firm, organization (required)
    await page.waitForSelector("#representative_organizationName");
    await page.type(
      "#representative_organizationName",
      application.data.representative.organizationName,
    );
    await sleep(300);

    // Mailing address (required)
    await page.waitForSelector("#representative_mailingAddress");
    await page.type(
      "#representative_mailingAddress",
      application.data.representative.mailingAddress,
    );
    await sleep(300);
  }

  async function step3(page, application) {
    // https://onlineservices-servicesenligne.cic.gc.ca/eta/welcome?lang=en#/application

    try {
      // -- Complete the application form --
      // What travel document do you plan to use to travel to Canada? (required)
      await page.waitForSelector(
        "#applicationDetails\\.prerequisite_travelDocumentType",
      );
      await page.select(
        "#applicationDetails\\.prerequisite_travelDocumentType",
        `${application.travel_document_type}`,
      );
      await sleep(300);

      // Select the code that matches the one on your passport. (required)
      await page.waitForSelector(
        "#applicationDetails\\.prerequisite_countryOfCitizenship",
      );
      await page.select(
        "#applicationDetails\\.prerequisite_countryOfCitizenship",
        application.data.prerequisite.countryOfCitizenship,
      );
      await sleep(300);

      // What is the nationality noted on this passport? (required)
      await page.waitForSelector(
        "#applicationDetails\\.prerequisite_passportNotedNationality",
      );
      await page.select(
        "#applicationDetails\\.prerequisite_passportNotedNationality",
        application.data.prerequisite.passportNotedNationality,
      );
      await sleep(300);

      // -- Passport details of applicant --

      // Passport number (required)
      await page.waitForSelector(
        "#applicationDetails\\.personalDetails_passportNumber",
      );
      await page.type(
        "#applicationDetails\\.personalDetails_passportNumber",
        application.data.personalDetails.passportNumber,
      );
      await sleep(300);

      // Passport number (re-enter) (required)
      await page.waitForSelector(
        "#applicationDetails\\.personalDetails_passportNumberReEnter",
      );
      await page.type(
        "#applicationDetails\\.personalDetails_passportNumberReEnter",
        application.data.personalDetails.passportNumberReEnter,
      );
      await sleep(300);

      // Surname(s) / last name(s) (required)
      await page.waitForSelector(
        "#applicationDetails\\.personalDetails_lastName",
      );
      await page.type(
        "#applicationDetails\\.personalDetails_lastName",
        application.data.personalDetails.lastName,
      );
      await sleep(300);

      // Given name(s) / first name(s)
      await page.waitForSelector(
        "#applicationDetails\\.personalDetails_firstName",
      );
      await page.type(
        "#applicationDetails\\.personalDetails_firstName",
        application.data.personalDetails.firstName ?? "",
      );
      await sleep(300);

      // Date of birth (required)
      await page.waitForSelector(
        "#applicationDetails\\.personalDetails_dobYear",
      );
      const dobYear = await findOptionValueByText(
        page,
        "applicationDetails.personalDetails_dobYear",
        `${application.data.personalDetails.dobYear}`,
      );
      await page.select(
        "#applicationDetails\\.personalDetails_dobYear",
        dobYear,
      );
      await sleep(300);

      // Date of birth (required)
      await page.waitForSelector(
        "#applicationDetails\\.personalDetails_dobMonth",
      );
      const dobMonth = await findOptionValueByText(
        page,
        "applicationDetails.personalDetails_dobMonth",
        `${application.data.personalDetails.dobMonth}`,
      );
      await page.select(
        "#applicationDetails\\.personalDetails_dobMonth",
        dobMonth,
      );
      await sleep(300);

      // Date of birth (required)
      await page.waitForSelector(
        "#applicationDetails\\.personalDetails_dobDay",
      );
      const dobDay = await findOptionValueByText(
        page,
        "applicationDetails.personalDetails_dobDay",
        `${application.data.personalDetails.dobDay}`,
      );
      await page.select("#applicationDetails\\.personalDetails_dobDay", dobDay);
      await sleep(300);

      // Gender (required)
      await page.waitForSelector(
        "#applicationDetails\\.personalDetails_gender",
      );
      await page.select(
        "#applicationDetails\\.personalDetails_gender",
        application.data.personalDetails.gender,
      );
      await sleep(300);

      // Country/territory of birth (required)
      await page.waitForSelector(
        "#applicationDetails\\.personalDetails_countryOfBirth",
      );
      await page.select(
        "#applicationDetails\\.personalDetails_countryOfBirth",
        application.data.personalDetails.countryOfBirth,
      );
      await sleep(300);

      // City/town of birth (required)
      await page.waitForSelector(
        "#applicationDetails\\.personalDetails_cityTownOfBirth",
      );
      await page.type(
        "#applicationDetails\\.personalDetails_cityTownOfBirth",
        application.data.personalDetails.cityTownOfBirth,
      );
      await sleep(300);

      // Date of issue of passport (required)
      await page.waitForSelector(
        "#applicationDetails\\.personalDetails_issueDateYear",
      );
      const issueDateYear = await findOptionValueByText(
        page,
        "applicationDetails.personalDetails_issueDateYear",
        `${application.data.personalDetails.issueDateYear}`,
      );
      await page.select(
        "#applicationDetails\\.personalDetails_issueDateYear",
        issueDateYear,
      );
      await sleep(300);

      // Date of issue of passport (required)
      await page.waitForSelector(
        "#applicationDetails\\.personalDetails_issueDateMonth",
      );
      const issueDateMonth = await findOptionValueByText(
        page,
        "applicationDetails.personalDetails_issueDateMonth",
        `${application.data.personalDetails.issueDateMonth}`,
      );
      await page.select(
        "#applicationDetails\\.personalDetails_issueDateMonth",
        issueDateMonth,
      );
      await sleep(300);

      // Date of issue of passport (required)
      await page.waitForSelector(
        "#applicationDetails\\.personalDetails_issueDateDay",
      );
      const issueDateDay = await findOptionValueByText(
        page,
        "applicationDetails.personalDetails_issueDateDay",
        `${application.data.personalDetails.issueDateDay}`,
      );
      await page.select(
        "#applicationDetails\\.personalDetails_issueDateDay",
        issueDateDay,
      );
      await sleep(300);

      // Date of expiry of passport (required)
      await page.waitForSelector(
        "#applicationDetails\\.personalDetails_expiryDateYear",
      );
      const expiryDateYear = await findOptionValueByText(
        page,
        "applicationDetails.personalDetails_expiryDateYear",
        `${application.data.personalDetails.expiryDateYear}`,
      );
      await page.select(
        "#applicationDetails\\.personalDetails_expiryDateYear",
        expiryDateYear,
      );
      await sleep(300);

      // Date of expiry of passport (required)
      await page.waitForSelector(
        "#applicationDetails\\.personalDetails_expiryDateMonth",
      );
      const expiryDateMonth = await findOptionValueByText(
        page,
        "applicationDetails.personalDetails_expiryDateMonth",
        `${application.data.personalDetails.expiryDateMonth}`,
      );
      await page.select(
        "#applicationDetails\\.personalDetails_expiryDateMonth",
        expiryDateMonth,
      );
      await sleep(300);

      // Date of expiry of passport (required)
      await page.waitForSelector(
        "#applicationDetails\\.personalDetails_expiryDateDay",
      );
      const expiryDateDay = await findOptionValueByText(
        page,
        "applicationDetails.personalDetails_expiryDateDay",
        `${application.data.personalDetails.expiryDateDay}`,
      );
      await page.select(
        "#applicationDetails\\.personalDetails_expiryDateDay",
        expiryDateDay,
      );
      await sleep(300);

      // -- Personal details of applicant --

      // Additional nationalities
      await page.waitForSelector(
        "#applicationDetails\\.personalDetails_additionalCitizenship",
      );
      await page.waitForSelector(".btn-add");

      for (
        let i = 0;
        i <
        application.data.personalDetails.additionalCountriesOfCitizenship
          .length;
        i++
      ) {
        if (
          application.data.personalDetails.additionalCountriesOfCitizenship[i]
            .label === "Japan"
        ) {
          continue;
        }

        await page.select(
          "#applicationDetails\\.personalDetails_additionalCitizenship",
          `${application.data.personalDetails.additionalCountriesOfCitizenship[i].value}`,
        );
        await page.click(".btn-add");
        await sleep(300);
      }

      if (
        isAdult(
          `${application.data.personalDetails.dobYear}-${application.data.personalDetails.dobMonth}-${application.data.personalDetails.dobDay}`,
        )
      ) {
        await step3dot1(page, application);
      } else {
        await step3dot2(page, application);
      }

      // -- Privacy notice --

      // I Agree (required)
      await page.waitForSelector(
        "#applicationDetails\\.consentAndDeclaration_inAggreance",
      );
      await page.click(
        "#applicationDetails\\.consentAndDeclaration_inAggreance",
      );
      await sleep(300);

      // Signature of applicant (required)
      await page.waitForSelector(
        "#applicationDetails\\.consentAndDeclaration_fullName",
      );
      await page.type(
        "#applicationDetails\\.consentAndDeclaration_fullName",
        application.data.consentAndDeclaration.fullName,
      );
      await sleep(300);

      await page.waitForSelector(".btn-next");
      await screenshot(page, application.id, "step3", false);
      await Promise.all([
        page.waitForNavigation({ waitUntil: "networkidle0" }),
        page.click(".btn-next"),
      ]);
      await page.waitForNetworkIdle();
    } catch (err) {
      await screenshot(page, application.id, "step3", true);

      throw new Error(err.stack);
    }
  }

  async function findOptionValueByText(page, selectId, text) {
    const value = await page.evaluate(
      (selectId, text) => {
        const element = document.getElementById(selectId);
        if (!element) {
          return null;
        }

        const options = element.options;
        for (let i = 0; i < options.length; i++) {
          if (options[i].text === text) {
            return options[i].value;
          }
        }

        return null;
      },
      selectId,
      text,
    );

    if (!value) {
      throw new Error(
        `No select tag found with id ${selectId} and text ${text}`,
      );
    }

    return value;
  }

  function isAdult(dateOfBirth) {
    // yyyy-mm-dd
    const dob = new Date(dateOfBirth);
    const now = new Date().toLocaleString("en-US", { timeZone: "Asia/Tokyo" });
    const today = new Date(now);

    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    const dayDiff = today.getDate() - dob.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age >= 18;
  }

  async function step3dot1(page, application) {
    // Date of birth (required)
    // age >= 18

    // Marital status (required)
    await page.waitForSelector(
      "#applicationDetails\\.personalDetails_maritalStatus",
    );
    await page.select(
      "#applicationDetails\\.personalDetails_maritalStatus",
      application.data.personalDetails.maritalStatus,
    );
    await sleep(300);

    // Have you ever applied for or obtained a visa, an eTA or a permit to visit, live, work or study in Canada? (required)
    await page.waitForSelector(
      "#applicationDetails\\.personalDetails_hasPreviouslyAppliedToCanada",
    );
    await page.select(
      "#applicationDetails\\.personalDetails_hasPreviouslyAppliedToCanada",
      application.data.personalDetails.hasPreviouslyAppliedToCanada,
    );
    await sleep(300);

    // Yes
    if (application.data.personalDetails.hasPreviouslyAppliedToCanada === "0") {
      // Unique client identifier (UCI) / Previous Canadian visa, eTA or permit number (optional)
      await page.waitForSelector("#applicationDetails\\.personalDetails_uci");
      await page.type(
        "#applicationDetails\\.personalDetails_uci",
        application.data.personalDetails.uci ?? "",
      );
      await sleep(300);

      // Unique client identifier (UCI) / Previous Canadian visa, eTA or permit number (re-enter)
      await page.waitForSelector(
        "#applicationDetails\\.personalDetails_uciReEnter",
      );
      await page.type(
        "#applicationDetails\\.personalDetails_uciReEnter",
        application.data.personalDetails.uciReEnter ?? "",
      );
      await sleep(300);
    }

    // -- Employment information --

    // Occupation (required)
    await page.waitForSelector(
      "#applicationDetails\\.employmentDetails_occupation",
    );
    await page.select(
      "#applicationDetails\\.employmentDetails_occupation",
      `${application.data.employmentDetails.occupation}`,
    );
    await page.waitForNetworkIdle();

    // Student
    if (application.data.employmentDetails.occupation === 12) {
      await step3dot1dot1(page, application);
    } else if (
      ![4, 10, 14].includes(application.data.employmentDetails.occupation)
    ) {
      // not in (Homemaker / Retired / Unemployed)
      await step3dot1dot2(page, application);
    }

    // -- Contact information --

    // Preferred language to contact you (required)
    await page.waitForSelector(
      "#applicationDetails\\.contactDetails_languageOfPreference",
    );
    await page.select(
      "#applicationDetails\\.contactDetails_languageOfPreference",
      application.data.contactDetails.languageOfPreference,
    );
    await sleep(300);

    // Email address (required)
    await page.waitForSelector(
      "#applicationDetails\\.contactDetails_emailAddress",
    );
    await page.type(
      "#applicationDetails\\.contactDetails_emailAddress",
      application.data.contactDetails.emailAddress,
    );
    await sleep(300);

    // Email address (re-enter) (required)
    await page.waitForSelector(
      "#applicationDetails\\.contactDetails_emailAddressReEnter",
    );
    await page.type(
      "#applicationDetails\\.contactDetails_emailAddressReEnter",
      application.data.contactDetails.emailAddressReEnter,
    );
    await sleep(300);

    // -- Residential address --

    // Apartment/unit number (if applicable)
    await page.waitForSelector("#applicationDetails\\.contactDetails_aptUnit");
    await page.type(
      "#applicationDetails\\.contactDetails_aptUnit",
      application.data.contactDetails.aptUnit ?? "",
    );
    await sleep(300);

    // Street/civic number or house name (required)
    await page.waitForSelector("#applicationDetails\\.contactDetails_streetNo");
    await page.type(
      "#applicationDetails\\.contactDetails_streetNo",
      application.data.contactDetails.streetNo,
    );
    await sleep(300);

    // Street address/name (required)
    await page.waitForSelector(
      "#applicationDetails\\.contactDetails_streetAddress",
    );
    await page.type(
      "#applicationDetails\\.contactDetails_streetAddress",
      application.data.contactDetails.streetAddress,
    );
    await sleep(300);

    // Street address/name line 2 (if applicable)
    await page.waitForSelector(
      "#applicationDetails\\.contactDetails_streetAddressAlt",
    );
    await page.type(
      "#applicationDetails\\.contactDetails_streetAddressAlt",
      application.data.contactDetails.streetAddressAlt ?? "",
    );
    await sleep(300);

    // City/town (required)
    await page.waitForSelector("#applicationDetails\\.contactDetails_city");
    await page.type(
      "#applicationDetails\\.contactDetails_city",
      application.data.contactDetails.city,
    );
    await sleep(300);

    // Country/territory (required)
    await page.waitForSelector("#applicationDetails\\.contactDetails_country");
    await page.select(
      "#applicationDetails\\.contactDetails_country",
      application.data.contactDetails.country,
    );
    await sleep(300);

    // District/region
    await page.waitForSelector("#applicationDetails\\.contactDetails_district");
    await page.type(
      "#applicationDetails\\.contactDetails_district",
      application.data.contactDetails.district ?? "",
    );
    await sleep(300);

    // -- Travel information --

    // Do you know when you will travel to Canada? (required)
    await page.waitForSelector(
      "#applicationDetails\\.travelDetails_isTravelDateKnown",
    );
    await page.select(
      "#applicationDetails\\.travelDetails_isTravelDateKnown",
      `${application.is_travel_date_known}`,
    );
    await sleep(300);

    // Yes
    if (application.is_travel_date_known === 0) {
      // When do you plan to travel to Canada? (required)
      await page.waitForSelector(
        "#applicationDetails\\.travelDetails_travelDateYear",
      );
      await page.select(
        "#applicationDetails\\.travelDetails_travelDateYear",
        `${application.data.travelDetails.travelDateYear}`,
      );
      await sleep(300);

      // When do you plan to travel to Canada? (required)
      await page.waitForSelector(
        "#applicationDetails\\.travelDetails_travelDateMonth",
      );
      await page.select(
        "#applicationDetails\\.travelDetails_travelDateMonth",
        `${application.data.travelDetails.travelDateMonth}`,
      );
      await sleep(300);

      // When do you plan to travel to Canada? (required)
      await page.waitForSelector(
        "#applicationDetails\\.travelDetails_travelDateDay",
      );
      await page.select(
        "#applicationDetails\\.travelDetails_travelDateDay",
        `${application.data.travelDetails.travelDateDay}`,
      );
      await sleep(300);

      // Please enter the time your flight to Canada will depart (required)
      await page.waitForSelector(
        "#applicationDetails\\.travelDetails_travelDateTimeHour",
      );
      await page.select(
        "#applicationDetails\\.travelDetails_travelDateTimeHour",
        `${application.data.travelDetails.travelDateTimeHour}`,
      );
      await sleep(300);

      // Please enter the time your flight to Canada will depart (required)
      await page.waitForSelector(
        "#applicationDetails\\.travelDetails_travelDateTimeMinute",
      );
      await page.select(
        "#applicationDetails\\.travelDetails_travelDateTimeMinute",
        `${application.data.travelDetails.travelDateTimeMinute}`,
      );
      await sleep(300);

      // Please enter the time your flight to Canada will depart (required)
      await page.waitForSelector(
        "#applicationDetails\\.travelDetails_travelDateTimeTimezone",
      );
      await page.select(
        "#applicationDetails\\.travelDetails_travelDateTimeTimezone",
        `${application.data.travelDetails.travelDateTimeTimezone}`,
      );
      await sleep(300);
    }

    // -- Background Questions --

    // Have you ever been refused a visa or permit, denied entry to, or ordered to leave Canada or any other country/territory? (required)
    await page.waitForSelector(
      "#applicationDetails\\.backgroundQuestions_refusedVisaOrPermitOrDeniedEntryToCanada",
    );
    await page.select(
      "#applicationDetails\\.backgroundQuestions_refusedVisaOrPermitOrDeniedEntryToCanada",
      application.data.backgroundQuestions
        .refusedVisaOrPermitOrDeniedEntryToCanada,
    );
    await sleep(300);

    // Yes
    if (
      application.data.backgroundQuestions
        .refusedVisaOrPermitOrDeniedEntryToCanada === "0"
    ) {
      // For each refusal, please indicate the country that refused you a visa or permit, or denied you entry, as well as the reasons provided to you by the country. (required)
      await page.waitForSelector(
        "#applicationDetails\\.backgroundQuestions_refusedVisaOrPermitOrDeniedEntryToCanadaDetails",
      );
      await page.type(
        "#applicationDetails\\.backgroundQuestions_refusedVisaOrPermitOrDeniedEntryToCanadaDetails",
        application.data.backgroundQuestions
          .refusedVisaOrPermitOrDeniedEntryToCanadaDetails,
      );
      await sleep(300);
    }

    // Have you ever committed, been arrested for, been charged with or convicted of any criminal offence in any country/territory? (required)
    await page.waitForSelector(
      "#applicationDetails\\.backgroundQuestions_committedOrArrestedOrChargedOrConvictedOfCriminalOffenceAnywhere",
    );
    await page.select(
      "#applicationDetails\\.backgroundQuestions_committedOrArrestedOrChargedOrConvictedOfCriminalOffenceAnywhere",
      application.data.backgroundQuestions
        .committedOrArrestedOrChargedOrConvictedOfCriminalOffenceAnywhere,
    );
    await sleep(300);

    // Yes
    if (
      application.data.backgroundQuestions
        .committedOrArrestedOrChargedOrConvictedOfCriminalOffenceAnywhere ===
      "0"
    ) {
      // For each arrest, charge, or conviction, please indicate where (city, country), when (month/year), the nature of the offence, and the sentence. (required)
      await page.waitForSelector(
        "#applicationDetails\\.backgroundQuestions_committedOrArrestedOrChargedOrConvictedOfCriminalOffenceAnywhereDetails",
      );
      await page.type(
        "#applicationDetails\\.backgroundQuestions_committedOrArrestedOrChargedOrConvictedOfCriminalOffenceAnywhereDetails",
        application.data.backgroundQuestions
          .committedOrArrestedOrChargedOrConvictedOfCriminalOffenceAnywhereDetails,
      );
      await sleep(300);
    }

    // In the past two years, were you diagnosed with tuberculosis or have you been in close contact with a person with tuberculosis? (required)
    await page.waitForSelector(
      "#applicationDetails\\.backgroundQuestions_inThePastTwoYearsWereYouDiagnosedOrInCloseContactWithTuberculosis",
    );
    await page.select(
      "#applicationDetails\\.backgroundQuestions_inThePastTwoYearsWereYouDiagnosedOrInCloseContactWithTuberculosis",
      application.data.backgroundQuestions
        .inThePastTwoYearsWereYouDiagnosedOrInCloseContactWithTuberculosis,
    );
    await sleep(300);

    // Yes
    if (
      application.data.backgroundQuestions
        .inThePastTwoYearsWereYouDiagnosedOrInCloseContactWithTuberculosis ===
      "0"
    ) {
      // Is your contact with tuberculosis the result of being a health care worker? (required)
      await page.waitForSelector(
        "#applicationDetails\\.backgroundQuestions_isYourContactWithTuberculosisTheResultOfBeingAHeathCareWorker",
      );
      await page.select(
        "#applicationDetails\\.backgroundQuestions_isYourContactWithTuberculosisTheResultOfBeingAHeathCareWorker",
        `${application.data.backgroundQuestions.isYourContactWithTuberculosisTheResultOfBeingAHeathCareWorker}`,
      );
      await sleep(300);

      // Yes
      if (
        application.data.backgroundQuestions
          .isYourContactWithTuberculosisTheResultOfBeingAHeathCareWorker === "0"
      ) {
        // Have you ever been diagnosed with tuberculosis? (required)
        await page.waitForSelector(
          "#applicationDetails\\.backgroundQuestions_haveYouEverBeenDiagnosedWithTuberculosis",
        );
        await page.select(
          "#applicationDetails\\.backgroundQuestions_haveYouEverBeenDiagnosedWithTuberculosis",
          application.data.backgroundQuestions
            .haveYouEverBeenDiagnosedWithTuberculosis,
        );
        await sleep(300);
      }
    }

    // Do you have one of these conditions? (required)
    await page.waitForSelector(
      "#applicationDetails\\.backgroundQuestions_doYouHaveOneOfTheseConditions",
    );
    await page.select(
      "#applicationDetails\\.backgroundQuestions_doYouHaveOneOfTheseConditions",
      application.data.backgroundQuestions.doYouHaveOneOfTheseConditions,
    );
    await sleep(300);

    // Please briefly indicate if there are additional details pertinent to your application. For example, an urgent need to travel to Canada. Provide relevant details to avoid delays in the processing of your application.
    await page.waitForSelector(
      "#applicationDetails\\.backgroundQuestions_haveOrWillHaveHealthInsuranceValidInCanadaDuringStayDetails",
    );
    await page.type(
      "#applicationDetails\\.backgroundQuestions_haveOrWillHaveHealthInsuranceValidInCanadaDuringStayDetails",
      application.data.backgroundQuestions
        .haveOrWillHaveHealthInsuranceValidInCanadaDuringStayDetails ?? "",
    );
    await sleep(300);
  }

  async function step3dot2(page, application) {
    // Date of birth (required)
    // age < 18

    // Have you ever applied for or obtained a visa, an eTA or a permit to visit, live, work or study in Canada? (required)
    await page.waitForSelector(
      "#applicationDetails\\.personalDetails_hasPreviouslyAppliedToCanada",
    );
    await page.select(
      "#applicationDetails\\.personalDetails_hasPreviouslyAppliedToCanada",
      application.data.personalDetails.hasPreviouslyAppliedToCanada,
    );
    await sleep(300);

    // Yes
    if (application.data.personalDetails.hasPreviouslyAppliedToCanada === "0") {
      // Unique client identifier (UCI) / Previous Canadian visa, eTA or permit number (optional)
      await page.waitForSelector("#applicationDetails\\.personalDetails_uci");
      await page.type(
        "#applicationDetails\\.personalDetails_uci",
        application.data.personalDetails.uci ?? "",
      );
      await sleep(300);

      // Unique client identifier (UCI) / Previous Canadian visa, eTA or permit number (re-enter)
      await page.waitForSelector(
        "#applicationDetails\\.personalDetails_uciReEnter",
      );
      await page.type(
        "#applicationDetails\\.personalDetails_uciReEnter",
        application.data.personalDetails.uciReEnter ?? "",
      );
      await sleep(300);
    }

    // -- Contact information --

    // Preferred language to contact you (required)
    await page.waitForSelector(
      "#applicationDetails\\.contactDetails_languageOfPreference",
    );
    await page.select(
      "#applicationDetails\\.contactDetails_languageOfPreference",
      application.data.contactDetails.languageOfPreference,
    );
    await sleep(300);

    // Email address (required)
    await page.waitForSelector(
      "#applicationDetails\\.contactDetails_emailAddress",
    );
    await page.type(
      "#applicationDetails\\.contactDetails_emailAddress",
      application.data.contactDetails.emailAddress,
    );
    await sleep(300);

    // Email address (re-enter) (required)
    await page.waitForSelector(
      "#applicationDetails\\.contactDetails_emailAddressReEnter",
    );
    await page.type(
      "#applicationDetails\\.contactDetails_emailAddressReEnter",
      application.data.contactDetails.emailAddressReEnter,
    );
    await sleep(300);

    // -- Residential address --

    // Apartment/unit number (if applicable)
    await page.waitForSelector("#applicationDetails\\.contactDetails_aptUnit");
    await page.type(
      "#applicationDetails\\.contactDetails_aptUnit",
      application.data.contactDetails.aptUnit ?? "",
    );
    await sleep(300);

    // Street/civic number or house name (required)
    await page.waitForSelector("#applicationDetails\\.contactDetails_streetNo");
    await page.type(
      "#applicationDetails\\.contactDetails_streetNo",
      application.data.contactDetails.streetNo,
    );
    await sleep(300);

    // Street address/name (required)
    await page.waitForSelector(
      "#applicationDetails\\.contactDetails_streetAddress",
    );
    await page.type(
      "#applicationDetails\\.contactDetails_streetAddress",
      application.data.contactDetails.streetAddress,
    );
    await sleep(300);

    // Street address/name line 2 (if applicable)
    await page.waitForSelector(
      "#applicationDetails\\.contactDetails_streetAddressAlt",
    );
    await page.type(
      "#applicationDetails\\.contactDetails_streetAddressAlt",
      application.data.contactDetails.streetAddressAlt ?? "",
    );
    await sleep(300);

    // City/town (required)
    await page.waitForSelector("#applicationDetails\\.contactDetails_city");
    await page.type(
      "#applicationDetails\\.contactDetails_city",
      application.data.contactDetails.city,
    );
    await sleep(300);

    // Country/territory (required)
    await page.waitForSelector("#applicationDetails\\.contactDetails_country");
    await page.select(
      "#applicationDetails\\.contactDetails_country",
      application.data.contactDetails.country,
    );
    await sleep(300);

    // District/region
    await page.waitForSelector("#applicationDetails\\.contactDetails_district");
    await page.type(
      "#applicationDetails\\.contactDetails_district",
      application.data.contactDetails.district ?? "",
    );
    await sleep(300);

    // -- Travel information --

    // Do you know when you will travel to Canada? (required)
    await page.waitForSelector(
      "#applicationDetails\\.travelDetails_isTravelDateKnown",
    );
    await page.select(
      "#applicationDetails\\.travelDetails_isTravelDateKnown",
      `${application.is_travel_date_known}`,
    );
    await sleep(300);

    // Yes
    if (application.is_travel_date_known === 0) {
      // When do you plan to travel to Canada? (required)
      await page.waitForSelector(
        "#applicationDetails\\.travelDetails_travelDateYear",
      );
      await page.select(
        "#applicationDetails\\.travelDetails_travelDateYear",
        `${application.data.travelDetails.travelDateYear}`,
      );
      await sleep(300);

      // When do you plan to travel to Canada? (required)
      await page.waitForSelector(
        "#applicationDetails\\.travelDetails_travelDateMonth",
      );
      await page.select(
        "#applicationDetails\\.travelDetails_travelDateMonth",
        `${application.data.travelDetails.travelDateMonth}`,
      );
      await sleep(300);

      // When do you plan to travel to Canada? (required)
      await page.waitForSelector(
        "#applicationDetails\\.travelDetails_travelDateDay",
      );
      await page.select(
        "#applicationDetails\\.travelDetails_travelDateDay",
        `${application.data.travelDetails.travelDateDay}`,
      );
      await sleep(300);

      // Please enter the time your flight to Canada will depart (required)
      await page.waitForSelector(
        "#applicationDetails\\.travelDetails_travelDateTimeHour",
      );
      await page.select(
        "#applicationDetails\\.travelDetails_travelDateTimeHour",
        `${application.data.travelDetails.travelDateTimeHour}`,
      );
      await sleep(300);

      // Please enter the time your flight to Canada will depart (required)
      await page.waitForSelector(
        "#applicationDetails\\.travelDetails_travelDateTimeMinute",
      );
      await page.select(
        "#applicationDetails\\.travelDetails_travelDateTimeMinute",
        `${application.data.travelDetails.travelDateTimeMinute}`,
      );
      await sleep(300);

      // Please enter the time your flight to Canada will depart (required)
      await page.waitForSelector(
        "#applicationDetails\\.travelDetails_travelDateTimeTimezone",
      );
      await page.select(
        "#applicationDetails\\.travelDetails_travelDateTimeTimezone",
        `${application.data.travelDetails.travelDateTimeTimezone}`,
      );
      await sleep(300);
    }
  }

  async function step3dot1dot1(page, application) {
    // Name of employer or school, as appropriate. (required)
    await page.waitForSelector(
      "#applicationDetails\\.employmentDetails_companyEmployerSchoolFacilityName",
    );
    await page.type(
      "#applicationDetails\\.employmentDetails_companyEmployerSchoolFacilityName",
      application.data.employmentDetails.companyEmployerSchoolFacilityName,
    );
    await sleep(300);

    // Country/territory (required)
    await page.waitForSelector("#applicationDetails\\.contactDetails_country");
    await page.select(
      "#applicationDetails\\.contactDetails_country",
      application.data.contactDetails.country,
    );
    await sleep(300);

    // City/town (required)
    await page.waitForSelector("#applicationDetails\\.contactDetails_city");
    await page.type(
      "#applicationDetails\\.contactDetails_city",
      application.data.contactDetails.city,
    );
    await sleep(300);

    // Since what year? (required)
    await page.waitForSelector(
      "#applicationDetails\\.employmentDetails_fromDateYear",
    );
    await page.select(
      "#applicationDetails\\.employmentDetails_fromDateYear",
      `${application.data.employmentDetails.fromDateYear}`,
    );
    await sleep(300);
  }

  async function step3dot1dot2(page, application) {
    // Job title (required)
    await page.waitForSelector("#applicationDetails\\.employmentDetails_title");
    await page.select(
      "#applicationDetails\\.employmentDetails_title",
      `${application.data.employmentDetails.title}`,
    );
    await sleep(300);

    // Name of employer or school, as appropriate. (required)
    await page.waitForSelector(
      "#applicationDetails\\.employmentDetails_companyEmployerSchoolFacilityName",
    );
    await page.type(
      "#applicationDetails\\.employmentDetails_companyEmployerSchoolFacilityName",
      application.data.employmentDetails.companyEmployerSchoolFacilityName,
    );
    await sleep(300);

    // Country/territory (required)
    await page.waitForSelector(
      "#applicationDetails\\.employmentDetails_country",
    );
    await page.select(
      "#applicationDetails\\.employmentDetails_country",
      application.data.employmentDetails.country,
    );
    await sleep(300);

    // City/town (required)
    await page.waitForSelector("#applicationDetails\\.employmentDetails_city");
    await page.type(
      "#applicationDetails\\.employmentDetails_city",
      application.data.employmentDetails.city,
    );
    await sleep(300);

    // Since what year? (required)
    await page.waitForSelector(
      "#applicationDetails\\.employmentDetails_fromDateYear",
    );
    await page.select(
      "#applicationDetails\\.employmentDetails_fromDateYear",
      `${application.data.employmentDetails.fromDateYear}`,
    );
    await sleep(300);
  }

  async function step4(page, jobId) {
    try {
      await page.waitForSelector("#method");
      await screenshot(page, jobId, "step4", false);

      await page.click("#method");
      await page.waitForNetworkIdle();
    } catch (err) {
      await screenshot(page, jobId, "step4", true);

      throw new Error(err.stack);
    }
  }

  function sleep(milliseconds) {
    return new Promise(function (resolve) {
      setTimeout(resolve, milliseconds);
    });
  }

  async function screenshot(page, jobId, stepName, isErr) {
    let folderPath;
    let filePath;

    if (isErr) {
      folderPath =
        "../public/screenshot/" + dayjs().format("YYYY-MM-DD") + `/${jobId}`;
      filePath = `${folderPath}/${stepName}-error.png`;
    } else {
      folderPath =
        "../public/screenshot/" + dayjs().format("YYYY-MM-DD") + `/${jobId}`;
      filePath = `${folderPath}/${stepName}.png`;
    }

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    return await page.screenshot({
      path: filePath,
      fullPage: true,
    });
  }

  function getScreenshotPaths(jobId) {
    let res = null;

    const imgPrefix =
      "screenshot/" + dayjs().format("YYYY-MM-DD") + `/${jobId}`;
    const folderPath = path.resolve(__dirname, `../public/${imgPrefix}`);
    const fileNames = fs.readdirSync(folderPath);

    if (fileNames && fileNames.length) {
      res = fileNames.map((fileName) => `${imgPrefix}/${fileName}`);
    }

    return res;
  }

  async function updataApplicationToDB(jobId, data) {
    const sql =
      "UPDATE `applications` SET `screenshots` = ?, `worker_log` = ?, `status` = ? WHERE `id` = ? LIMIT 1";
    const values = [data.screenshots, data.workerLog, data.status, jobId];

    await dbConnection.execute(sql, values);
  }
})();
