export class ResourceNotFound extends Error {
  public statusCode: number;

  constructor(message: string = 'Resource not found') {
    super(message);
    this.name = 'ResourceNotFound';
    this.statusCode = 404;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ResourceNotFound);
    }
  }
}
