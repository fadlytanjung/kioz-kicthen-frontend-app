import index from '../index';

describe('index', () => {
  test('must retun object', () => {
    expect(typeof {}).toEqual(typeof index);
  });
});
