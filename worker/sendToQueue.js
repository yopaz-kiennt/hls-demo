const amqp = require("amqplib/callback_api");
const crypto = require("crypto");

amqp.connect("amqp://localhost", function (error0, connection) {
  if (error0) {
    throw error0;
  }

  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }

    var queue = "application";
    var msg = JSON.stringify({
      id: crypto.randomInt(100),
    });

    channel.assertQueue(queue, {
      durable: true,
    });

    channel.sendToQueue(queue, Buffer.from(msg));
    console.log(" [x] Sent %s", msg);
  });

  setTimeout(function () {
    connection.close();
    process.exit(0);
  }, 500);
});
