import { EventVisitIdNotDefinedException } from '../src/domainExceptions';
import messageHandler from '../src/messageHandler';
const Given = describe, When = describe, And = describe, Then = it;

Given('Given messageHandler definition', () => {
  When('When the function is imported', () => {
    Then('Then the function must exist', () => {
      expect(messageHandler).toBeDefined();
    });
  })
});

Given('Given the messageHandler function', () => {
  When(`When the function is passed a payload without the property 'visitId'`, () => {
    Then('Then the function must throw EventVisitIdNotDefinedException', () => {
      expect(() => {
        const messageTopic: Buffer = Buffer.from('visit');
        const message: Buffer = Buffer.from(`{"id":9000000001}`);
        messageHandler(messageTopic, message);
      }).toThrow(EventVisitIdNotDefinedException);
    })
  })
});
