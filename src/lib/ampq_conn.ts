import amqp from "amqplib/callback_api";

let _connection: amqp.Connection | null = null;
let _channel: amqp.ConfirmChannel | null = null;

export async function getAmqpChannel(): Promise<amqp.ConfirmChannel> {
  if(_connection && _channel) return _channel;

  return new Promise((resolve, reject) => {
    amqp.connect(process.env.AMQP_URL!, (connErr, connection) => {
        if (connErr) {
            _connection = null;
            _channel = null;
            console.error("[AMQP] Connection error:", connErr.message);
            return reject(connErr);
        }
        _connection = connection;

        connection.on("error", (err) => {
            console.error("[AMQP] Connection error:", err.message);
            _connection = null;
            _channel = null;
          });
          connection.on("close", () => {
            console.log("[AMQP] Connection closed");
            _connection = null;
            _channel = null;
          });

        connection.createConfirmChannel((channErr, channel) => {
        if (channErr) {
            _channel = null;
            console.error("[AMQP] Channel creation error:", channErr.message);
            return reject(channErr);
            }
            channel.on("error", (err) => {
            _channel = null;
            console.error("[AMQP] channel error", err.message);
          });
          channel.on("close", () => {
            _channel = null;
            console.log("[AMQP] channel closed");
          });
          resolve(channel)
        });
      });
  })
}