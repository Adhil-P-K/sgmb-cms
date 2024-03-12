class CustomError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: any, stack?: any) {
    super(message);
    this.statusCode = statusCode;
    this.stack = stack;
  }
}
export { CustomError };
