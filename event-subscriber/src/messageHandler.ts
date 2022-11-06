import { EventVisitIdNotDefinedException } from './domainExceptions';

export default function (messageTopic: Buffer, message: Buffer): void {
  const topic = messageTopic.toString();
  const visitMessage = JSON.parse(message.toString());
  if (!visitMessage.visitId) throw new EventVisitIdNotDefinedException();
};
