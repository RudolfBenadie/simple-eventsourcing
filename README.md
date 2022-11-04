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

Also update the typescript transformer in the generated jest config file:

```ts
  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },

  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  transformIgnorePatterns: ['./node_modules/'],
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

## Chapter 3 - Event subscriber

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

Also update the typescript transformer in the generated jest config file:

```ts
  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },

  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  transformIgnorePatterns: ['./node_modules/'],
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
