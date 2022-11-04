var zmq = require("zeromq"),
  sock = zmq.socket("sub");

export class Server {
  #active: boolean;

  constructor() {
    this.#active = false;
  }

  isActive() { return this.#active };

  start(messageHandler: Function) {
    sock.connect("tcp://127.0.0.1:3000");
    sock.subscribe("visit");
    console.log("Subscriber connected to port 3000");
    sock.on("message", messageHandler);
    this.#active = true;
  }

  stop() {
    sock = zmq.socket("sub");
    this.#active = false;
  }
};
