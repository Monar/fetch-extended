[![npm version](https://badge.fury.io/js/fetch-extended.svg)](https://badge.fury.io/js/fetch-extended)

# fetch-extended
Wrapper of [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), adding few extra features:
- Allow to pass `Headers` as a plain js object
- Simplifies work with searchParams, instead handcrafting url, just pass `options.query` and done
- Timeout requests after 60s by default and allows to change this behaviour
- Allow to create fetch with default headers and options

## Install
```bash
// To install es5 version of the package just
npm install fetch-extended

// To install es6/es2015 version of the package just
npm install fetch-extended@es6

// Each version > 1.0.0 is available as es5 and es6 version
npm instlal fetch-extended@1.0.0
// and
npm instlal fetch-extended@1.0.0-es6
```

## Usage
### Standard `fetch` Features:
```js
import fetch from 'fetch-extended';

// default GET method
fetch('https://www.google.com')
  .then(response => handleResponse(response));

// change method to POST
fetch('https://www.google.com', { method: 'PUT' })
  .then(response => handleResponse(response));

// and more...
```
For more parameters and configuration to go to [Mozzila docs](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch).

You can also use named export like this:
```js
import { fetchx } from 'fetch-extended';

const response = await fetchx('https://www.google.com');
const postResponse = await fetchx('https://www.google.com', { method: 'PUT' });
// and more...
```

### Query Parameters
To simplify generating searchParams you can just pass `query` object with `options`.
```js
import { fetchx } from 'fetch-extended';

const query = {
  filter: 'cats',
  sort: 'age',
};

await fetchx('https://www.google.com', { query })
// The command will call: `https://www.google.com?filter=cats&sort=age`
```

### Timeout
With `timeout` key you can pass the number of milliseconds of timeout for the request. By default the timeout equals 60000 ms (60 s).
Setting `timeout` as any not numerical value like `undefined` or `null` will turn off this feature and behaviour is the same as standard `fetch`.

```js
import fetch, { TimeoutError } from 'fetch-extended';

const timeout = 15000;

fetch('https://www.reject-after-15s.com', { timeout })
  .then(response => handleResponse(response))
  .catch(error => if(error instanceof TimeoutError) { console.log('Request timeoued out') });
```

### Defaults
To overwrite or set your own default headers and options use `getFetchx`.
```js
import { getFetchx } from 'fetch-extended';

const defaultHeaders = {
  'api-token': 'my-secret-api-token',
};

const defaultOptions = {
  timeout: null,
  method: 'POST',
  headers: {
    'api-token': 'secondary-token',
    'sessions-id': 'session',
  },
};

const fetchOne = getFetchx(defaultHeaders);
await fetchOne('http://google.com')
// equivalent of fetchx('http://google.com', { headers: defaultHeaders });

const fetchTwo = getFetchx({}, defaultOptions);
await fetchTwo('http://google.com')
// equivalent of fetchx('http://google.com', defaultOptions);

const fetchThree = getFetchx(defaultHeaders, defaultOptions);
await fetchThree('http://google.com')
/* equivalent of calling with options:
{
  timeout: null,
  method: 'POST',
  headers: {
    'api-token': 'my-secret-api-token',
    'sessions-id': 'session',
  },
}
*/

await fetchThree('http://google.com', { timeout: 10000, headers: { 'api-token': 'my-token' }})
/* equivalent of calling with options:
{
  timeout: 10000,
  method: 'POST',
  headers: {
    'api-token': 'my-token',
    'sessions-id': 'session',
  },
}
*/
```
