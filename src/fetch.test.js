/* eslint-env jest */
import 'isomorphic-fetch';

import { fetchWrapper, fetchxDefaults } from './fetch';
import { TimeoutError } from './errors.js'

describe('Fetch implementation', () => {
  it('should work with just an url', () => {
    const fetch = url => Promise.resolve(url);
    const url = 'http://test.address.com';

    const promise = fetchWrapper(fetch, fetchxDefaults, url);

    expect(promise).resolves.toBe(url);
  });

  it('should work with search query', () => {
    const fetch = url => Promise.resolve(url);
    const url = 'http://test.address.com';
    const query = {
      miłość: 'Love&Cuddle',
      options: [1, 2, null, 'tree'],
      'ups not again': undefined,
    };

    const expected = {
      miłość: 'Love&Cuddle',
      options: '1,2,,tree',
      'ups not again': 'undefined',
    };

    const promise = fetchWrapper(fetch, fetchxDefaults, url, { query });

    promise.then(url => {
      const test = new URL(url);
      Object.keys(query).forEach(key => {
        expect(test.searchParams.get(key)).toBe(expected[key]);
      });
    });
  });

  it('should all the options', () => {
    const fetch = (url, options) => Promise.resolve(options);
    const url = 'http://test.address.com';
    const testHeaders = new Headers();

    const testOptions = {
      method: 'GET',
      headers: testHeaders,
      mode: 'cors',
      cache: 'default',
    };

    const promise = fetchWrapper(fetch, fetchxDefaults, url, testOptions);

    expect(promise).resolves.toMatchSnapshot();
  });

  it('should reject when reach timeout', async () => {
    const fetch = () =>
      new Promise(resolve => {
        setTimeout(() => resolve('lol'), 10000);
      });

    const url = 'http://www.fuu.com/';

    const promise = fetchWrapper(fetch, fetchxDefaults, url, { timeout: 0 });

    await expect(promise).rejects.toBeInstanceOf(TimeoutError);
  });
});
