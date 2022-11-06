import { EventVisitIdNotDefinedException } from './domainExceptions';

export class Repository {
  #eventStream: Array<any>;

  constructor() {
    this.#eventStream = [];
  }

  getById(visitId: number): Array<any> {
    return this.#eventStream.filter(event => event.visitId === visitId);
  }

  commit(event: any): number | null {
    if (!Object.getOwnPropertyNames(event).includes('visitId')) {
      throw new EventVisitIdNotDefinedException();
    }
    this.#eventStream.push(event);
    return event.visitId;
  }
};
