import { Server } from '../src/server';
let server: Server | null;

beforeAll(() => {
  server = new Server();
})

describe('Given a Server class', () => {
  describe('When the server is instantiated', () => {
    it('Then the server must exist', () => {
      expect(server).toBeDefined();
    });
  })
})