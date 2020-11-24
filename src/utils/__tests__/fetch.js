import axios from 'axios';
import fetch from '../fetch';

jest.mock('axios');

describe('fetch', () => {
  beforeEach(() => {
    const mockFn = (param) => new Promise((resolve, reject) => {
      if (param === 'test') resolve({ data: 'success' });
      else reject({});
    });

    axios.mockImplementation(mockFn);
  });

  it('returns resolved value', async () => {
    expect.assertions(1);
    const test = await fetch('test');

    expect(test).toEqual('success');
  });

  it('returns default reject message given no response in error', async () => {
    expect.assertions(1);
    try { await fetch(''); }
    catch (e) { expect(e.message).toEqual('Failed to fetch data. Please contact developer.'); }
  });

  it('returns default reject message given no response.data in error', async () => {
    const mockFn = (param) => new Promise((resolve, reject) => {
      if (param === 'test') resolve({ data: 'success' });
      else reject({ response: 'fail' });
    });

    axios.mockImplementation(mockFn);

    expect.assertions(1);
    try { await fetch(''); }
    catch (e) { expect(e.message).toEqual('Failed to fetch data. Please contact developer.'); }
  });

  it('returns reject message from error', async () => {
    const data = {
      message: 'fail',
    };
    const mockFn = (param) => new Promise((resolve, reject) => {
      if (param === 'test') resolve({ data: 'success' });
      else reject({ response: { data } });
    });

    axios.mockImplementation(mockFn);

    expect.assertions(1);
    try { await fetch(''); }
    catch (e) { expect(e.message).toEqual('fail'); }
  });
});
