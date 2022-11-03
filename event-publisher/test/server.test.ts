import { Server } from '../src/server';

describe('Given a Server class', () => {
  describe('When the server is instantiated', () => {
    it('Then the server must exist', () => {
      const server = new Server();
      expect(server).toBeDefined();
    })
  })
})
