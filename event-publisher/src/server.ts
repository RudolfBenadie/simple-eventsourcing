const zmq = require("zeromq"),
  sock = zmq.socket("pub");

export class Server {
  #timer: NodeJS.Timer | undefined;

  constructor(socket: number = 3000) {
    sock.bindSync(`tcp://127.0.0.1:${socket}`);
    console.log(`Publisher bound to port ${socket}`);
  }

  start() {
    this.#timer = setInterval(() => {
      console.log("sending a multipart message envelope");
      sock.send(["kitty cats", "meow!"]);
    }, 2500);
  }

  stop() {
    clearInterval(this.#timer);
  }

};
