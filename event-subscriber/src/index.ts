import { Server } from './server';
import { Repository } from './repository';
import messageHandler from './messageHandler';
const server = new Server();
const repository = new Repository();

server.start(messageHandler);
