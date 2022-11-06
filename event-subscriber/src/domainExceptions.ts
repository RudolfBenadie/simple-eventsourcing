export class EventVisitIdNotDefinedException extends Error {
  constructor(message: string = '') {
    super(message);

    // 👇️ because we are extending a built-in class
    Object.setPrototypeOf(this, EventVisitIdNotDefinedException.prototype);
  }
}
