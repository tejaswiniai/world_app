
class ApiError<T extends string> extends Error {
  name: T;
  message: string;
  cause: any;
  constructor(name: string, message: string, cause?: any) {
    super();
    this.name = name as T;
    this.message = message;
    this.cause = cause;
  }
}
export class NotFoundError extends ApiError<"NotFoundError"> {
  constructor(message: string, cause?: any) {
    super("NotFoundError", message, cause);
  }
}
export class IternalServerError extends ApiError<"InternalServerError"> {
  constructor(message: string, cause?: any) {
    super("InternalServerError", message, cause);
  }
}

export class ServiceUnavailableError extends ApiError<"ServiceUnavailableError"> {
  constructor(message: string, cause?: any) {
    super("ServiceUnavailableError", message, cause);
  }
}

export class UnauthorizedError extends ApiError<"UnauthorizedError"> {
  constructor(message: string, cause?: any) {
    super("UnauthorizedError", message, cause);
  }
}