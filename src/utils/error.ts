export class ErrorCode {
  public static readonly InternalServerError = 'InternalServerError';
  public static readonly BadRequest = 'BadRequest';
  public static readonly Forbidden = 'Forbidden';
  public static readonly NotFound = 'NotFound';
  public static readonly TooManyRequests = 'TooManyRequests';
  public static readonly AsyncError = 'AsyncError';
  public static readonly UnknowError = 'UnknowError';
}

export class ErrorModel {
  public code: string;
  public status: number;
  public metaData?: unknown;
}

export class ErrorException extends Error {
  public status: number;
  public metaData: unknown;

  constructor(code: string = ErrorCode.InternalServerError, metaData?: unknown) {
    super(code);

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = code;
    this.status = 500;
    this.metaData = metaData;

    switch (code) {
      case ErrorCode.BadRequest:
        this.status = 400;
        break;
      case ErrorCode.Forbidden:
        this.status = 403;
        break;
      case ErrorCode.NotFound:
        this.status = 404;
        break;
      case ErrorCode.TooManyRequests:
        this.status = 429;
        break;
      default:
        break;
    }
  }
}
