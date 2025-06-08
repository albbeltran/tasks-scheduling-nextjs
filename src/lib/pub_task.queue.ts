import { getAmqpChannel } from "./ampq_conn";

export default async function startProducer(task: any) {
    const channel = await getAmqpChannel()

    const queue = 'tasks';

    channel.assertQueue(queue, {
        durable: false
    });

    channel.sendToQueue(queue, Buffer.from(task));
    console.log(" [x] Sent %s", task);
} 