import { Server } from 'http';
import { EventIdNotDefinedException } from '../src/domainExceptions';
import { Repository } from '../src/repository';
const Given = describe, When = describe, And = describe, Then = it;

let repository: Repository | null;

beforeAll(() => {
  repository = new Repository();
})

Given('Given a Server class', () => {
  When('When the server is instantiated', () => {
    Then('Then the server must exist', () => {
      expect(repository).toBeDefined();
    });
  })
})

Given('Given an instance of the repository', () => {
  When('When retrieving the events for an entity visitId', () => {
    And('And the eventStream store is empty', () => {
      Then('Then an empty array is returned', () => {
        const readResult = repository?.getById(1);
        expect(readResult).toBeInstanceOf(Array);
        expect(readResult?.length).toEqual(0);
      })
    })
  })
})

Given('Given an instance of the repository', () => {
  When('When committing an event to the eventStream store', () => {
    And('And the event has an visitId', () => {
      Then('Then the event is stored in the eventStream and the visitId is returned', () => {
        const idList = [0, 1];
        idList.forEach(visitId => {
          const commitResult = repository?.commit({ visitId });
          expect(commitResult).toEqual(visitId);
        })
      })
    })

    And('And the event does not have an visitId', () => {
      Then('Then the system must throw a EventIdNotDefinedException', () => {
        expect(() => repository?.commit({ visitId: 9000000001 })).toThrow();
      })
    })

    And('And the events for the visitId is queried from the eventStream store', () => {
      Then('Then an array of events is returned for the visitId', () => {
        const idList = [0, 1];
        idList.forEach(visitId => {
          repository?.commit({ visitId });
          const readResult = repository?.getById(visitId);
          expect(readResult).toBeInstanceOf(Array);
          expect(readResult?.length).toBeGreaterThan(0);
        })
      })
    })
  })
})
