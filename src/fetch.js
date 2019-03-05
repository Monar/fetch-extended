import {
  mergeHeaders,
  constructSearchParams,
  timeoutPromise,
} from './utils';

export const fetchxDefaults = {
  headers: {},
  options: {
    timeout: 60000,
    queryParser: constructSearchParams,
  },
};

export function fetchx(...args) {
  return fetchWrapper(fetch, fetchxDefaults, ...args);
}

export function getFetchx(defaultHeaders = {}, defautlOptions = {}) {
  const defaults = {
    headers: mergeHeaders(fetchxDefaults.headers, defaultHeaders),
    options: Object.assign({}, fetchxDefaults.options, defautlOptions),
  };

  return (...args) => fetchWrapper(fetch, defaults, ...args);
}

export function fetchWrapper(fetchImp, defaults, url, options = {}) {
  const headers = mergeHeaders(defaults.headers, options.headers);
  const fetchOptions = Object.assign({}, defaults.options, options, { headers });
  const searchParams = fetchOptions.queryParser(fetchOptions.query);
  const fetchURL = searchParams ? `${url}?${searchParams}` : url;

  const promise = fetchImp(fetchURL, fetchOptions);
  const { timeout } = fetchOptions;
  if (typeof timeout === 'number') {
    return timeoutPromise(timeout, promise, { url: fetchURL, options: fetchOptions });
  }

  return promise;
}
