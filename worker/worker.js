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
  };

  // CALL ETA
  async function apply(msg) {
    let res = ApplicationStatus.ERROR;
    let jobId;
    let application;

    try {
      jobId = getJobId(msg);
      application = await findApplicationFromDB(jobId);
      console.log(application);
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
        if (application.is_representative === 0) {
          // Yes
          await step2(page, application);
        }

        // await step3(page, jobId);
        // await step4(page, jobId);
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

  async function findApplicationFromDB(applicationId) {
    const sql = "SELECT * FROM `applications` WHERE `id` = ? LIMIT 1";
    const values = [applicationId];
    const [rows] = await dbConnection.execute(sql, values);

    if (rows.length === 0) {
      throw new Error(`No application found with id ${applicationId}`);
    }

    return rows[0];
  }

  async function initBrowser() {
    return await puppeteer.launch({
      headless: false, // TODO
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
        await page.select("#welcome_isRepresentative", "1"); // No
        await sleep(300);
      } else {
        await page.select("#welcome_isRepresentative", "0"); // Yes
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
  }

  async function step2dot1(page, application) {
    try {
      // I am (required)
      await page.waitForSelector("#representative_representativeRelationship");
      await page.select("#representative_representativeRelationship", "0"); //
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
      await screenshot(page, application.id, "step2-1", false);
      await page.click(".btn-next");
      await page.waitForNetworkIdle();

      if (currentUrl === page.url()) {
        await screenshot(page, application.id, "step2-1", true);
      }
    } catch (err) {
      await screenshot(page, application.id, "step2-1", true);

      throw new Error(err.stack);
    }
  }

  async function step2dot2(page, application) {
    try {
      // I am (required)
      await page.waitForSelector("#representative_representativeRelationship");
      await page.select("#representative_representativeRelationship", "1"); //
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
        application.data.representative.organizationName ?? "",
      );
      await sleep(300);

      // Mailing address (required)
      await page.waitForSelector("#representative_mailingAddress");
      await page.type(
        "#representative_mailingAddress",
        application.data.representative.mailingAddress,
      );
      await sleep(300);

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
      await screenshot(page, application.id, "step2-2", false);
      await page.click(".btn-next");
      await page.waitForNetworkIdle();

      if (currentUrl === page.url()) {
        await screenshot(page, application.id, "step2-2", true);
      }
    } catch (err) {
      await screenshot(page, application.id, "step2-2", true);

      throw new Error(err.stack);
    }
  }

  async function step2dot3(page, application) {
    try {
      // I am (required)
      await page.waitForSelector("#representative_representativeRelationship");
      await page.select("#representative_representativeRelationship", "2"); //
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
        application.data.representative.membershipIdNumber ?? "",
      );
      await sleep(300);

      // Which province or territory? (required)
      await page.waitForSelector("#representative_province");
      await page.type(
        "#representative_province",
        application.data.representative.province ?? "",
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
        application.data.representative.organizationName ?? "",
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
        application.data.representative.postalCodeZip ?? "",
      );
      await sleep(300);

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
      await screenshot(page, application.id, "step2-3", false);
      await page.click(".btn-next");
      await page.waitForNetworkIdle();

      if (currentUrl === page.url()) {
        await screenshot(page, application.id, "step2-3", true);
      }
    } catch (err) {
      await screenshot(page, application.id, "step2-3", true);

      throw new Error(err.stack);
    }
  }

  async function step2dot4(page, application) {
    try {
      // I am (required)
      await page.waitForSelector("#representative_representativeRelationship");
      await page.select("#representative_representativeRelationship", "3"); //
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
        application.data.representative.membershipIdNumber ?? "",
      );
      await sleep(300);

      // Which province or territory? (required)
      await page.waitForSelector("#representative_province");
      await page.type(
        "#representative_province",
        application.data.representative.province ?? "",
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
        application.data.representative.organizationName ?? "",
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
        application.data.representative.postalCodeZip ?? "",
      );
      await sleep(300);

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
      await screenshot(page, application.id, "step2-4", false);
      await page.click(".btn-next");
      await page.waitForNetworkIdle();

      if (currentUrl === page.url()) {
        await screenshot(page, application.id, "step2-4", true);
      }
    } catch (err) {
      await screenshot(page, application.id, "step2-4", true);

      throw new Error(err.stack);
    }
  }

  async function step2dot5(page, application) {
    try {
      // I am (required)
      await page.waitForSelector("#representative_representativeRelationship");
      await page.select("#representative_representativeRelationship", "4"); //
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
        application.data.representative.membershipIdNumber ?? "",
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
        application.data.representative.organizationName ?? "",
      );
      await sleep(300);

      // Mailing address (required)
      await page.waitForSelector("#representative_mailingAddress");
      await page.type(
        "#representative_mailingAddress",
        application.data.representative.mailingAddress,
      );
      await sleep(300);

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
      await screenshot(page, application.id, "step2-5", false);
      await page.click(".btn-next");
      await page.waitForNetworkIdle();

      if (currentUrl === page.url()) {
        await screenshot(page, application.id, "step2-5", true);
      }
    } catch (err) {
      await screenshot(page, application.id, "step2-5", true);

      throw new Error(err.stack);
    }
  }

  async function step2dot6(page, application) {
    try {
      // I am (required)
      await page.waitForSelector("#representative_representativeRelationship");
      await page.select("#representative_representativeRelationship", "5"); //
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
        application.data.representative.organizationName ?? "",
      );
      await sleep(300);

      // Mailing address (required)
      await page.waitForSelector("#representative_mailingAddress");
      await page.type(
        "#representative_mailingAddress",
        application.data.representative.mailingAddress,
      );
      await sleep(300);

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
      await screenshot(page, application.id, "step2-6", false);
      await page.click(".btn-next");
      await page.waitForNetworkIdle();

      if (currentUrl === page.url()) {
        await screenshot(page, application.id, "step2-6", true);
      }
    } catch (err) {
      await screenshot(page, application.id, "step2-6", true);

      throw new Error(err.stack);
    }
  }

  async function step3(page, jobId) {
    // TODO: cases, data
    try {
      await page.waitForSelector(
        "#applicationDetails\\.prerequisite_travelDocumentType",
      );
      await page.select(
        "#applicationDetails\\.prerequisite_travelDocumentType",
        "0",
      );
      await sleep(300);

      await page.waitForSelector(
        "#applicationDetails\\.prerequisite_countryOfCitizenship",
      );
      await page.select(
        "#applicationDetails\\.prerequisite_countryOfCitizenship",
        "97",
      );
      await sleep(300);

      await page.waitForSelector(
        "#applicationDetails\\.prerequisite_passportNotedNationality",
      );
      await page.select(
        "#applicationDetails\\.prerequisite_passportNotedNationality",
        "87",
      );
      await sleep(300);

      await page.waitForSelector(
        "#applicationDetails\\.personalDetails_passportNumber",
      );
      await page.type(
        "#applicationDetails\\.personalDetails_passportNumber",
        "ZE0005098",
      );
      await sleep(300);

      await page.waitForSelector(
        "#applicationDetails\\.personalDetails_passportNumberReEnter",
      );
      await page.type(
        "#applicationDetails\\.personalDetails_passportNumberReEnter",
        "ZE0005098",
      );
      await sleep(300);

      await page.waitForSelector(
        "#applicationDetails\\.personalDetails_lastName",
      );
      await page.type(
        "#applicationDetails\\.personalDetails_lastName",
        "LastName",
      );
      await sleep(300);

      await page.waitForSelector(
        "#applicationDetails\\.personalDetails_firstName",
      );
      await page.type(
        "#applicationDetails\\.personalDetails_firstName",
        "FirstName",
      );
      await sleep(300);

      await page.waitForSelector(
        "#applicationDetails\\.personalDetails_dobYear",
      );
      await page.select("#applicationDetails\\.personalDetails_dobYear", "25");
      await sleep(300);

      await page.waitForSelector(
        "#applicationDetails\\.personalDetails_dobMonth",
      );
      await page.select("#applicationDetails\\.personalDetails_dobMonth", "4");
      await sleep(300);

      await page.waitForSelector(
        "#applicationDetails\\.personalDetails_dobDay",
      );
      await page.select("#applicationDetails\\.personalDetails_dobDay", "16");
      await sleep(300);

      await page.waitForSelector(
        "#applicationDetails\\.personalDetails_gender",
      );
      await page.select("#applicationDetails\\.personalDetails_gender", "1");
      await sleep(300);

      await page.waitForSelector(
        "#applicationDetails\\.personalDetails_countryOfBirth",
      );
      await page.select(
        "#applicationDetails\\.personalDetails_countryOfBirth",
        "107",
      );
      await sleep(300);

      await page.waitForSelector(
        "#applicationDetails\\.personalDetails_cityTownOfBirth",
      );
      await page.type(
        "#applicationDetails\\.personalDetails_cityTownOfBirth",
        "Tokyo",
      );
      await sleep(300);

      await page.waitForSelector(
        "#applicationDetails\\.personalDetails_issueDateYear",
      );
      await page.select(
        "#applicationDetails\\.personalDetails_issueDateYear",
        "0",
      );
      await sleep(300);

      await page.waitForSelector(
        "#applicationDetails\\.personalDetails_issueDateMonth",
      );
      await page.select(
        "#applicationDetails\\.personalDetails_issueDateMonth",
        "4",
      );
      await sleep(300);

      await page.waitForSelector(
        "#applicationDetails\\.personalDetails_issueDateDay",
      );
      await page.select(
        "#applicationDetails\\.personalDetails_issueDateDay",
        "12",
      );
      await sleep(300);

      await page.waitForSelector(
        "#applicationDetails\\.personalDetails_expiryDateYear",
      );
      await page.select(
        "#applicationDetails\\.personalDetails_expiryDateYear",
        "15",
      );
      await sleep(300);

      await page.waitForSelector(
        "#applicationDetails\\.personalDetails_expiryDateMonth",
      );
      await page.select(
        "#applicationDetails\\.personalDetails_expiryDateMonth",
        "4",
      );
      await sleep(300);

      await page.waitForSelector(
        "#applicationDetails\\.personalDetails_expiryDateDay",
      );
      await page.select(
        "#applicationDetails\\.personalDetails_expiryDateDay",
        "16",
      );
      await sleep(300);

      await page.waitForSelector(
        "#applicationDetails\\.personalDetails_maritalStatus",
      );
      await page.select(
        "#applicationDetails\\.personalDetails_maritalStatus",
        "6",
      );
      await sleep(300);

      await page.waitForSelector(
        "#applicationDetails\\.personalDetails_hasPreviouslyAppliedToCanada",
      );
      await page.select(
        "#applicationDetails\\.personalDetails_hasPreviouslyAppliedToCanada",
        "1",
      );
      await sleep(300);

      await page.waitForSelector(
        "#applicationDetails\\.employmentDetails_occupation",
      );
      await page.select(
        "#applicationDetails\\.employmentDetails_occupation",
        "4",
      );
      await page.waitForNetworkIdle();

      await page.waitForSelector(
        "#applicationDetails\\.contactDetails_languageOfPreference",
      );
      await page.select(
        "#applicationDetails\\.contactDetails_languageOfPreference",
        "0",
      );
      await sleep(300);

      await page.waitForSelector(
        "#applicationDetails\\.contactDetails_emailAddress",
      );
      await page.type(
        "#applicationDetails\\.contactDetails_emailAddress",
        "example@email.com",
      );
      await sleep(300);

      await page.waitForSelector(
        "#applicationDetails\\.contactDetails_emailAddressReEnter",
      );
      await page.type(
        "#applicationDetails\\.contactDetails_emailAddressReEnter",
        "example@email.com",
      );
      await sleep(300);

      await page.waitForSelector(
        "#applicationDetails\\.contactDetails_streetNo",
      );
      await page.type(
        "#applicationDetails\\.contactDetails_streetNo",
        "Street No",
      );
      await sleep(300);

      await page.waitForSelector(
        "#applicationDetails\\.contactDetails_streetAddress",
      );
      await page.type(
        "#applicationDetails\\.contactDetails_streetAddress",
        "Street Address",
      );
      await sleep(300);

      await page.waitForSelector("#applicationDetails\\.contactDetails_city");
      await page.type("#applicationDetails\\.contactDetails_city", "City");
      await sleep(300);

      await page.waitForSelector(
        "#applicationDetails\\.contactDetails_country",
      );
      await page.select("#applicationDetails\\.contactDetails_country", "105");
      await sleep(300);

      await page.waitForSelector(
        "#applicationDetails\\.travelDetails_isTravelDateKnown",
      );
      await page.select(
        "#applicationDetails\\.travelDetails_isTravelDateKnown",
        "1",
      );
      await sleep(300);

      await page.waitForSelector(
        "#applicationDetails\\.backgroundQuestions_refusedVisaOrPermitOrDeniedEntryToCanada",
      );
      await page.select(
        "#applicationDetails\\.backgroundQuestions_refusedVisaOrPermitOrDeniedEntryToCanada",
        "1",
      );
      await sleep(300);

      await page.waitForSelector(
        "#applicationDetails\\.backgroundQuestions_committedOrArrestedOrChargedOrConvictedOfCriminalOffenceAnywhere",
      );
      await page.select(
        "#applicationDetails\\.backgroundQuestions_committedOrArrestedOrChargedOrConvictedOfCriminalOffenceAnywhere",
        "1",
      );
      await sleep(300);

      await page.waitForSelector(
        "#applicationDetails\\.backgroundQuestions_inThePastTwoYearsWereYouDiagnosedOrInCloseContactWithTuberculosis",
      );
      await page.select(
        "#applicationDetails\\.backgroundQuestions_inThePastTwoYearsWereYouDiagnosedOrInCloseContactWithTuberculosis",
        "1",
      );
      await sleep(300);

      await page.waitForSelector(
        "#applicationDetails\\.backgroundQuestions_doYouHaveOneOfTheseConditions",
      );
      await page.select(
        "#applicationDetails\\.backgroundQuestions_doYouHaveOneOfTheseConditions",
        "3",
      );
      await sleep(300);

      await page.waitForSelector(
        "#applicationDetails\\.consentAndDeclaration_inAggreance",
      );
      await page.click(
        "#applicationDetails\\.consentAndDeclaration_inAggreance",
      );
      await sleep(300);

      await page.waitForSelector(
        "#applicationDetails\\.consentAndDeclaration_fullName",
      );
      await page.type(
        "#applicationDetails\\.consentAndDeclaration_fullName",
        "FirstName LastName",
      );
      await sleep(300);

      await page.waitForSelector(".btn-next");
      await screenshot(page, jobId, "step2", false);

      await Promise.all([
        page.waitForNavigation({ waitUntil: "networkidle0" }),
        page.click(".btn-next"),
      ]);
      await page.waitForNetworkIdle();
    } catch (err) {
      await screenshot(page, jobId, "step2", true);

      throw new Error(err.stack);
    }
  }

  async function step4(page, jobId) {
    try {
      await page.waitForSelector("#method");
      await screenshot(page, jobId, "step3", false);

      await page.click("#method");
      await page.waitForNetworkIdle();
    } catch (err) {
      await screenshot(page, jobId, "step3", true);

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
