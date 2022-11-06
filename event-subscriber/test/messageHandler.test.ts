import { MessageHandler } from '../src/messageHandler';

const Given = describe, When = describe, And = describe, Then = it;
let messageHandler: MessageHandler;

Given('Given the messageHandler class', () => {
  When('When the class is instantiated', () => {
    Then('Then the messageHandler object must exist', () => {
      messageHandler = new MessageHandler();
      expect(messageHandler).toBeDefined();
    })
  })

  When('When the class is instantiated with and event', () => {
    Then('Then invoking the event method returns the event', () => {
      const visitMessage = { visitId: 9000000001 };
      messageHandler = new MessageHandler(visitMessage);
      const messageQueryResult = messageHandler.message;
      expect(messageQueryResult).toStrictEqual(visitMessage);
    })
  })
})
