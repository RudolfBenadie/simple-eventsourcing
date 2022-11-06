export class MessageHandler {

  message: any;

  constructor(message: any = undefined) {
    if (message) this.setMessage(message);
  }

  setMessage(message: any) {
    this.message = message;
  }

};
