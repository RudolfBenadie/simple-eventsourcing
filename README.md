# simple-eventsourcing

## Chapter 1

Create folder structures

```shell
|
|- event-publisher
|- event-subscriber
```

```brainfuck
  $ npm init -y
  $ git init //root folder only
```

In root add ".gitignore"

```
**/node_modules
```

## Chapter 2 - Event publisher

Create folder src and test
Add file test/server.test.ts

Install packages

```brainfuck
$ npm i -D jest ts-jest @types/jest ts-node @types/node
$ jest init
$ npm i zeromq@5
```

```brainfuck
$ npx tsc --init
$ jest --init
```

Update the typescript transformer in the generated jest config file:

```ts
  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },

  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  transformIgnorePatterns: ['./node_modules/'],
```

Update the typescript configuration file (tsconfig.js) and update the following values:

```json
  "sourceMap": true, /* Create source map files for emitted JavaScript files. */
  "outDir": "./dist", /* Specify an output folder for all emitted files. */
```

Update package.json to add teh following scripts section:

```json
  "scripts": {
    "build": "tsc -p tsconfig.build.json",
    "test": "jest --detectOpenHandles --forceExit",
    "start": "node dist/src/index"
  },
```

This will result in our first failing test - it is failing because no tests have been added to the file yet. (Red)

Add the following code in the test file to make the test pass (this only verifies that our testing framework is operational):

```javascript
import { Server } from '../src/server';
let server: Server | null;

beforeAll(() => {
  server = new Server();
});

describe('Given a Server class', () => {
  describe('When the server is instantiated', () => {
    it('Then the server must exist', () => {
      expect(server).toBeDefined();
    });
  });
});
```

Verify that the test passes: (Green)

```brainfuck
$ npm run test
```

The next step in TDD is to refactor. (Refactor)

### Add a zeromq server

Update the test:

```javascript
import { Server } from '../src/server';

describe('Given a Server class', () => {
  describe('When the server is instantiated', () => {
    it('Then the server must exist', () => {
      const server = new Server();
      expect(server).toBeDefined();
    });
  });
});
```

Run the test and verify that it fails (red).
Make the test pass by adding the file server.ts in the 'src' folder with a simple class 'Server'

```
export class Server { };
```

Run the test and verify that it passes (green)

- Add tests for starting and stopping server.
- Run the tests and see them fail (red)
- Add code to implement server with start and stop functions
- Run tests and see them pass (green)

Fin - See final commit for chapter 2

## Chapter 3 - Event subscriber > Server

As in chapter 2 set up the environment to start working:
(Verify that you are working from the correct folder /event-subscriber)

Create folder src and test
Add file test/server.test.ts

Install packages

```brainfuck
$ npm i -D jest ts-jest @types/jest ts-node @types/node
$ npx tsc --init
$ jest --init
$ npm i zeromq@5
```

Update the typescript transformer in the generated jest config file:

```ts
  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },

  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  transformIgnorePatterns: ['./node_modules/'],
```

Update the typescript configuration file (tsconfig.js) and update the following values:

```json
  "sourceMap": true, /* Create source map files for emitted JavaScript files. */
  "outDir": "./dist", /* Specify an output folder for all emitted files. */
```

Update package.json to add teh following scripts section:

```json
  "scripts": {
    "build": "tsc -p tsconfig.build.json",
    "test": "jest --detectOpenHandles --forceExit",
    "start": "node dist/src/index"
  },
```

Again as before this will result in our first failing test - it is failing because no tests have been added to the file yet. (Red)

Add the following code in the test file to make the test pass (this only verifies that our testing framework is operational):

```javascript
import { Server } from '../src/server';
let server: Server | null;

beforeAll(() => {
  server = new Server();
});

describe('Given a Server class', () => {
  describe('When the server is instantiated', () => {
    it('Then the server must exist', () => {
      expect(server).toBeDefined();
    });
  });
});
```

Verify that the test passes: (Green)

```brainfuck
$ npm run test
```

The next step in TDD is to refactor. (Refactor)

Add a test for starting the message subscriber, something like:

```javascript
describe('Given an instance of the subscriber service', () => {
  describe('When the server is started', () => {
    it('Then the server is active', () => {
      server?.start(() => {
        return null;
      });
      expect(server?.isActive()).toBeTruthy();
    });
  });
});
```

Run the test that should fail (red).
Implement the message subscriber logic to make the test pass (green).

```javascript
export class Server {
  #active: boolean;

  constructor() {
    this.#active = false;
  }

  isActive() {
    return this.#active;
  }

  start(messageHandler: Function) {
    sock.connect('tcp://127.0.0.1:3000');
    sock.subscribe('visit');
    console.log('Subscriber connected to port 3000');
    sock.on('message', messageHandler);
    this.#active = true;
  }

  stop() {
    sock = zmq.socket('sub');
    this.#active = false;
  }
}
```

> At this point we can do a simple integration test run to see that the data is being sent and received through the queue.
>
> Build both projects, then start the subscriber which will start listening on the specified port for any messages.
> Next you can start the publishing server which will log out the data to the console and send the message on the message bus. The subscriber will receive the message and log it to the console too. This takes care of our simple system message bus.

```brainfuck
$\event-publisher> npm run build
$\event-publisher> npm run start
$\event-subscriber> npm run build
$\event-subscriber> npm run start
```

## Chapter 4 - Event subscriber > Repository

Add a test file test/repsoitory.test.ts

```javascript
import { Repository } from '../src/repository';

let repository: Repository | null;

beforeAll(() => {
  repository = new Repository();
});
describe('Given a Server class', () => {
  describe('When the server is instantiated', () => {
    it('Then the server must exist', () => {
      expect(repository).toBeDefined();
    });
  });
});
```

The test should fail because the repsoitory files does not exist yet (red).
Implement a simple repository class src/repository.ts:

```javascript
export class Repository {}
```

Run the test and see it pass (green).

Add a test for Repository.getById(visitId: number) that will return an empty array if no events exist for the visitId.

```javascript
Given('Given an instance of the repository', () => {
  When('When retrieving the events for an entity visitId', () => {
    And('And the eventStream store is empty', () => {
      Then('Then an empty array is returned', () => {
        const readResult = repository?.getById(1);
        expect(readResult).toBeInstanceOf(Array);
        expect(readResult?.length).toEqual(0);
      });
    });
  });
});
```

(red)

Implement code to make the test pass. Write only the absolute minimum code, with the least complexity to make the test pass:

```javascript
  getById(visitId: number): Array<any> {
    return new Array();
  }
```

(green)

Add the next test for the commit function.

(refactor)

```javascript
Given('Given an instance of the repository', () => {
  When('When committing an event to the eventStream store', () => {
    And('And the event has an visitId', () => {
      Then(
        'Then the event is stored in the eventStream and the visitId is returned',
        () => {
          const idList = [0, 1];
          idList.forEach((visitId) => {
            const commitResult = repository?.commit({ visitId });
            expect(commitResult).toEqual(visitId);
          });
        }
      );
    });
  });
});
```

(red)

Implement the least code to satidfy the test:

```javascript
  commit(event: any): number | null {
    return event.visitId;
  }
```

(green)

Extend the test suite to test retrieving data from the store:

(refactor)

```javascript
Given('Given an instance of the repository', () => {
  When('When committing an event to the eventStream store', () => {
    And('And the event has an visitId', () => {
      Then(
        'Then the event is stored in the eventStream and the visitId is returned',
        () => {
          const idList = [0, 1];
          idList.forEach((visitId) => {
            const commitResult = repository?.commit({ visitId });
            expect(commitResult).toEqual(visitId);
          });
        }
      );
    });

    And(
      'And the events for the visitId is queried from the eventStream store',
      () => {
        Then('Then an array of events is returned for the visitId', () => {
          const idList = [0, 1];
          idList.forEach((visitId) => {
            repository?.commit({ visitId });
            const readResult = repository?.getById(visitId);
            expect(readResult).toBeInstanceOf(Array);
            expect(readResult?.length).toBeGreaterThan(0);
          });
        });
      }
    );
  });
});
```

(red)

Implement the memory store to make the test pass:

```javascript
  commit(event: any): number | null {
    this.#eventStream.push(event);
    return event.visitId;
  }
```

(green)

Add tests for event validation. The event should have a visitId so we'll be able to retrieve all events for by visitId.

```javascript
And('And the event does not have an visitId', () => {
  Then('Then the system must throw a EventVisitIdNotDefinedException', () => {
    expect(() => repository?.commit({ visitId: 9000000001 })).toThrow();
  });
});
```

(red)

Implement a new exception class:

```javascript
export class EventVisitIdNotDefinedException extends Error {
  constructor(message: string = '') {
    super(message);

    // 👇️ because we are extending a built-in class
    Object.setPrototypeOf(this, EventVisitIdNotDefinedException.prototype);
  }
}
```

(red)

And also update the code to validate and event.

```javascript
  commit(event: any): number | null {
    if (!Object.getOwnPropertyNames(event).includes('visitId')) {
      throw new EventVisitIdNotDefinedException();
    }
    this.#eventStream.push(event);
    return event.visitId;
  }
```

(green)

This satisfies the requirement for our simple repository to to store our event stream in a memory store.

This satisfies the requirement for our simple repository to to store our event stream in a memory store.

## Chapter 5 - Refactor event subscriber > Implement eventhandler

Add test file messageHandler.test.ts:

```javascript
import { messageHandler } from '../src/messageHandler';
const Given = describe,
  When = describe,
  And = describe,
  Then = it;

Given('Given a Server class', () => {
  When('When the server is instantiated', () => {
    Then('Then the server must exist', () => {
      expect(messageHandler).toBeDefined();
    });
  });
});
```

(red)

Add function definition in messageHandler.ts

```javascript
export default function (messageTopic: Buffer, message: Buffer): void {
  const topic = messageTopic.toString();
  const visitMessage = JSON.parse(message.toString());
}
```

(green)

(refactor)

Add test for failing message validation:

```javascript
Given('Given the messageHandler function', () => {
  When(
    `When the function is passed a payload without the property 'visitId'`,
    () => {
      Then(
        'Then the function must throw EventVisitIdNotDefinedException',
        () => {
          expect(() => {
            const messageTopic: Buffer = Buffer.from('visit');
            const message: Buffer = Buffer.from(`{"id":9000000001}`);
            messageHandler(messageTopic, message);
          }).toThrow(EventVisitIdNotDefinedException);
        }
      );
    }
  );
});
```

(red)

```javascript
import { EventVisitIdNotDefinedException } from './domainExceptions';

export default function (messageTopic: Buffer, message: Buffer): void {
  const topic = messageTopic.toString();
  const visitMessage = JSON.parse(message.toString());
  if (!visitMessage.visitId) throw new EventVisitIdNotDefinedException();
}
```

(green)

(refactor)
