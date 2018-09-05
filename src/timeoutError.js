export class TimeoutError extends Error {
  constructor(msg, timeout, request) {
    super(msg);
    this.timout = timeout;
    this.request = request;
  }
}
