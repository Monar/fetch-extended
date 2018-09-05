export class TimeoutError extends Error {
  constructor(msg, url, timeout) {
    super(msg);
    this.timout = timeout;
    this.url = url;
  }
}

