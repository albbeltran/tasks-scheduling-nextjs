import amqp from "amqplib/callback_api";

export default async function startProducer(task: any) {
  amqp.connect(process.env.AMQP_URL!, function(connErr, connection) {
    if (connErr) {
      throw connErr;
    }
    connection.createConfirmChannel(function(channErr, channel) {
      if(channErr) throw channErr;
      channel.on("error", function(err) {
        console.error("[AMQP] channel error", err.message);
      });
      channel.on("close", function() {
        console.log("[AMQP] channel closed");
      });

      const queue = 'tasks';
  
      channel.assertQueue(queue, {
        durable: false
      });
  
      channel.sendToQueue(queue, Buffer.from(task));
      console.log(" [x] Sent %s", task);
    });
  });
} 