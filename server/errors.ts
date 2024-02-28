export class APIRequestError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'APIRequestError';
    this.statusCode = statusCode;
  }
}
