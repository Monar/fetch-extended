import { TimeoutError } from './errors.js'

export function mergeHeaders(h1 = {}, h2 = {}) {
  const headers = new Headers();
  appendHeaders(headers, h1);
  appendHeaders(headers, h2);
  return headers;
}

function appendHeaders(headers, toAppend) {
  if (toAppend instanceof Headers) {
    toAppend.forEach((value, key) => headers.append(key, value));
    return;
  }
  Object.keys(toAppend).forEach(key => headers.append(key, toAppend[key]));
}

export function constructSearchParams(query = {}) {
  const searchParams = new URLSearchParams();
  Object.keys(query).forEach(key => searchParams.append(key, query[key]));
  return searchParams.toString();
}

export function timeoutPromise(timeout, promise, url) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new TimeoutError(`Request ${url} reached timeout.`, url, timeout));
    }, timeout);

    promise.then(
      res => {
        clearTimeout(timeoutId);
        resolve(res);
      },
      err => {
        clearTimeout(timeoutId);
        reject(err);
      },
    );
  });
}
