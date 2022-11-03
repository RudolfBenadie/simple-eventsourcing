"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Server_timer, _Server_isActive;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const zmq = require("zeromq"), sock = zmq.socket("pub");
class Server {
    constructor(socket = 3000) {
        _Server_timer.set(this, void 0);
        _Server_isActive.set(this, void 0);
        __classPrivateFieldSet(this, _Server_isActive, true, "f");
        sock.bindSync(`tcp://127.0.0.1:${socket}`);
        console.log(`Publisher bound to port ${socket}`);
    }
    start() {
        __classPrivateFieldSet(this, _Server_isActive, true, "f");
        __classPrivateFieldSet(this, _Server_timer, setInterval(() => {
            console.log("sending a multipart message envelope");
            sock.send(["kitty cats", "meow!"]);
        }, 2500), "f");
    }
    stop() {
        clearInterval(__classPrivateFieldGet(this, _Server_timer, "f"));
        __classPrivateFieldSet(this, _Server_isActive, false, "f");
    }
    isActive() {
        return __classPrivateFieldGet(this, _Server_isActive, "f");
    }
}
exports.Server = Server;
_Server_timer = new WeakMap(), _Server_isActive = new WeakMap();
;
//# sourceMappingURL=server.js.map