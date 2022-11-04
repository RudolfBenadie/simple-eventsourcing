import { Repository } from '../src/repository';

let repository: Repository | null;

beforeAll(() => {
  repository = new Repository();
})
describe('Given a Server class', () => {
  describe('When the server is instantiated', () => {
    it('Then the server must exist', () => {
      expect(repository).toBeDefined();
    });
  })
})
