const zmq = require("zeromq"),
  sock = zmq.socket("pub");

export class Server {
  #timer: NodeJS.Timer | undefined;
  #visitGenerator: Generator<unknown, unknown, unknown> | undefined;

  constructor(socket: number = 3000) {
    this.#visitGenerator = this.#getVisits();
    sock.bindSync(`tcp://127.0.0.1:${socket}`);
    console.log(`Publisher bound to port ${socket}`);
  }

  *#getVisits() {
    let visitData: [Object] = require('./event-data/visit-events').visitData;
    let index = 0;
    while (index < visitData.length) {
      yield (visitData[index++]);
    }
    return "No more visits";
  }

  #sendVisit() {
    const visit = this.#visitGenerator?.next();
    if (visit && !visit.done) {
      console.log("Sending a multipart (event)-message envelope");
      console.log(`visit: ${JSON.stringify(visit.value)}`);
      sock.send(["visit", visit.value]);
    }
  }

  start() {
    this.#visitGenerator = this.#getVisits();
    this.#timer = setInterval(() => {
      const visit = this.#visitGenerator?.next();
      if (visit && !visit.done) {
        console.log("Sending a multipart (event)-message envelope");
        console.log(`visit: ${JSON.stringify(visit.value)}`);
        sock.send(["visit", visit.value]);
      }
    }, 2500);
  }

  stop() {
    clearInterval(this.#timer);
  }

};

