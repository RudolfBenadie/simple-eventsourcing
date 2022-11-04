"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Server_instances, _Server_timer, _Server_visitGenerator, _Server_getVisits, _Server_sendVisit;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const zmq = require("zeromq"), sock = zmq.socket("pub");
class Server {
    constructor(socket = 3000) {
        _Server_instances.add(this);
        _Server_timer.set(this, void 0);
        _Server_visitGenerator.set(this, void 0);
        __classPrivateFieldSet(this, _Server_visitGenerator, __classPrivateFieldGet(this, _Server_instances, "m", _Server_getVisits).call(this), "f");
        sock.bindSync(`tcp://127.0.0.1:${socket}`);
        console.log(`Publisher bound to port ${socket}`);
    }
    start() {
        __classPrivateFieldSet(this, _Server_visitGenerator, __classPrivateFieldGet(this, _Server_instances, "m", _Server_getVisits).call(this), "f");
        __classPrivateFieldSet(this, _Server_timer, setInterval(() => {
            var _a;
            const visit = (_a = __classPrivateFieldGet(this, _Server_visitGenerator, "f")) === null || _a === void 0 ? void 0 : _a.next();
            if (visit && !visit.done) {
                console.log("Sending a multipart (event)-message envelope");
                console.log(`visit: ${JSON.stringify(visit.value)}`);
                sock.send(["visit", visit.value]);
            }
        }, 2500), "f");
    }
    stop() {
        clearInterval(__classPrivateFieldGet(this, _Server_timer, "f"));
    }
}
exports.Server = Server;
_Server_timer = new WeakMap(), _Server_visitGenerator = new WeakMap(), _Server_instances = new WeakSet(), _Server_getVisits = function* _Server_getVisits() {
    let visitData = require('./event-data/visit-events').visitData;
    let index = 0;
    while (index < visitData.length) {
        yield (visitData[index++]);
    }
    return "No more visits";
}, _Server_sendVisit = function _Server_sendVisit() {
    var _a;
    const visit = (_a = __classPrivateFieldGet(this, _Server_visitGenerator, "f")) === null || _a === void 0 ? void 0 : _a.next();
    if (visit && !visit.done) {
        console.log("Sending a multipart (event)-message envelope");
        console.log(`visit: ${JSON.stringify(visit.value)}`);
        sock.send(["visit", visit.value]);
    }
};
;
//# sourceMappingURL=server.js.map