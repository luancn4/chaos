import amqp from "amqplib";

const runEmailWorker = async () => {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  const exchange = "user-events";
  const queue = "email-service";

  await channel.assertExchange(exchange, "fanout", { durable: true });
  await channel.assertQueue(queue, { durable: true });

  await channel.bindQueue(queue, exchange, "");

  channel.consume(queue, async (msg) => {
    if (!msg) return;

    const data = JSON.parse(msg.content.toString());

    console.log("Sending welcome email to: ", data.email);

    // simulate delay
    await new Promise((r) => setTimeout(r, 2000));

    console.log("Email sent");

    channel.ack(msg);
  });

  console.log("Email worker running...");
};

runEmailWorker();
