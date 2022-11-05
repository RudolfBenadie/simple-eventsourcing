export class EventIdNotDefinedException extends Error {
  constructor(message: string = '') {
    super(message);

    // 👇️ because we are extending a built-in class
    Object.setPrototypeOf(this, EventIdNotDefinedException.prototype);
  }
}
