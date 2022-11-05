import { EventHandler } from '../src/eventHandler';

const Given = describe, When = describe, And = describe, Then = it;
let eventHandler: EventHandler;

Given('Given the EventHandler class', () => {
  When('When the class is instantiated', () => {
    Then('Then the eventHandler object must exist', () => {
      eventHandler = new EventHandler();
      expect(eventHandler).toBeDefined();
    })
  })

  When('When the class is instantiated with and event', () => {
    Then('Then invoking the event method returns the event', () => {
      const visitEvent = { visitId: 9000000001 };
      eventHandler = new EventHandler(visitEvent);
      const eventQueryResult = eventHandler.event;
      console.log(eventQueryResult);
      expect(eventQueryResult).toStrictEqual(visitEvent);
    })
  })
})
