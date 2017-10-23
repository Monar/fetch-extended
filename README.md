[![npm version](https://badge.fury.io/js/fetch-extended.svg)](https://badge.fury.io/js/fetch-extended)

# fetch-extended
Wrapper of [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), adding few extra features

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

## Additional Stuff

### Query Parameters
```js
import fetch from 'fetch-extended'; 

const query = {
  filter: 'cats',
  sort: 'age',
};

fetch('https://www.google.com', { query })
  .then(response => handleResponse(response));
```

The command will generate request with URL: `https://www.google.com?filter=cats&sort=age`

### Timeout
With `timeout` key you can pass the number of milliseconds of timeout for the request. By default the timeout equals 60000 ms (60 s).

```js
import fetch from 'fetch-extended'; 

const timeout = 30000;

fetch('https://www.this-request-will-be-rejected-after-30-seconds.com', { timeout })
  .then(response => handleResponse(response))
  .catch(errorWithUrlAndOptions => handleError(errorWithUrlAndOptions));
```