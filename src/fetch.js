/*
  Copyright (C) 2017 Piotr Tomasz Monarski.
  Licensed under the MIT License (MIT), see
  https://github.com/Monar/fetch-extended
*/

let defautlHeaders = {};

let defautlOptions = {
  timeout: 60000,
};

export default function(...args) {
  return fetchImplementation(fetch, ...args);
}

export function fetchImplementation(fetch, url, options = {}) {
  const headers = mergeHeaders(defautlHeaders, options.headers);
  const searchParams = constructSearchParams(options.query);
  const fetchURL = searchParams ? `${url}?${searchParams}` : url;
  let fetchOptions = Object.assign(
    {},
    defautlOptions,
    options,
    { headers },
  );

  const promise = fetch(fetchURL, fetchOptions);
  const timeout = fetchOptions.timeout;
  if (typeof timeout === 'number') {
    return timeoutPromise(timeout, promise, fetchURL, fetchOptions);
  }

  return promise;
}

fetchImplementation.setDefaultOptions = function(options) {
  defautlOptions = options;
};

fetchImplementation.setDefaultHeaders = function(headers) {
  defautlHeaders = headers;
};

function mergeHeaders(h1 = {}, h2 = {}) {
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

function constructSearchParams(query = {}) {
  const seachParams = new URLSearchParams();
  Object.keys(query).forEach(key => seachParams.append(key, query[key]));
  return seachParams.toString();
}

function timeoutPromise(ms, promise, url, options) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      const error = new Error(getTimeoutErrorMsg({ url, options }));
      reject(error);
    }, ms);
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

function getTimeoutErrorMsg({url, options})  {
  return 'fetch-extended: Request reached timeout.\nurl: ' + url + '\n options=' + JSON.stringify(options);
}

