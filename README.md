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

Install packages

```brainfuck
$ npm i -D npm i jest ts-jest @types/jest @types/node
$ npx ts-jest config:init
$ npm i npm i ts-node zeromq@5
```

Create folder src and test
Add file test/server.test.ts

This will result in our first failing test - it is failing because no tests have been added to the file yet. (Red)

Add the following code in the test file to make the test pass (this only verifies that our testing framework is operational):

```
describe('Given a Server class', () => {
  describe('When the server is instantiated', () => {
    it('Then the server must exist', () => {
      expect(true).toBe(true);
    })
  })
})
```

Verify that the test passes: (Green)

```brainfuck
$ npm run test
```

The next step in TDD is to refactor. (Refactor)
