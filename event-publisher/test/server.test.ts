import { Server } from '../src/server';
let server: Server | null;
jest.setTimeout(5000);
jest.useFakeTimers();

beforeAll(() => {
  //jest.useFakeTimers({ legacyFakeTimers: true });
  jest.spyOn(global, 'setInterval');
  jest.spyOn(global, 'clearInterval');
  server = new Server();
})

afterAll(() => {
  jest.clearAllTimers();
})

describe('Given a Server class', () => {
  describe('When the server is instantiated', () => {
    it('Then the server must exist', () => {
      expect(server).toBeDefined();
    });
  })
})

describe('Given an instance of the event publisher server', () => {
  describe('When the server is started', () => {
    it('Then the execution timer must exist', () => {
      server?.start();
      expect(setInterval).toBeCalled();
      jest.clearAllTimers();
    });
  })
  describe('When the server is running', () => {
    describe('And the server is stopped', () => {
      it('Then the execution timer must exist', () => {
        server?.stop();
        expect(clearInterval).toBeCalled();
        jest.clearAllTimers();
      });
    })
  })
})
