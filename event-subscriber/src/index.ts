import { Server } from './server';
import { Repository } from './repository';
const server = new Server();
const repository = new Repository();

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
