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

        if (application.is_representative === 0) {
          // Yes
          // await step3(page, jobId);
        }

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
