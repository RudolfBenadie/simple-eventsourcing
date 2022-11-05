export class EventHandler {

  event: any;

  constructor(event: any = undefined) {
    if (event) this.setEvent(event);
  }

  setEvent(event: any) {
    this.event = event;
  }

};
