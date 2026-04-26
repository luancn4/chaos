import amqp from "amqplib";

type SignupEvent = {
  userId: string;
  email: string;
  name: string;
};

const runProducer = async () => {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  const exchange = "user-events";

  await channel.assertExchange(exchange, "fanout", { durable: true });

  const publishSignup = (event: SignupEvent) => {
    const message = Buffer.from(JSON.stringify(event));

    channel.publish(exchange, "", message, { persistent: true });

    console.log("User signup event published:", event);
  };

  const user: SignupEvent = {
    userId: "123",
    email: "user@email.com",
    name: "Luan",
  };

  publishSignup(user);

  setTimeout(async () => {
    await channel.close();
    await connection.close();
  }, 500);
};

runProducer();
