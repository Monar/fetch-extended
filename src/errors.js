export class TimeoutError extends Error {
  constructor(msg, request) {
    super(msg);
    this.request = request;
  }
}

