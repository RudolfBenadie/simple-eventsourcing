import { Server } from './server';
const server = new Server();
server.start((messageTopic: Buffer, message: Buffer) => {
  const topic = messageTopic.toString();
  const payload = JSON.parse(message.toString());
  console.log(
    "received a message related to:",
    topic,
    "containing message:",
    payload,
  );
});
