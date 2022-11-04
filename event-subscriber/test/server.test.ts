import { Server } from '../src/server';

let server: Server | null;

beforeAll(() => {
  server = new Server();
})

afterAll(() => {
  server?.stop();
})

describe('Given a Server class', () => {
  describe('When the server is instantiated', () => {
    it('Then the server must exist', () => {
      expect(server).toBeDefined();
    });
  })
})

describe('Given an instance of the subscriber service', () => {
  describe('When the server is started', () => {
    it('Then the server is active', () => {
      server?.start(() => { return null });
      expect(server?.isActive()).toBeTruthy();
    })
  })
})
