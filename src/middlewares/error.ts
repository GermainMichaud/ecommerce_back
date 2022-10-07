import { NextFunction, Request, Response } from 'express';

import { ErrorCode, ErrorException, ErrorModel } from '../utils/error';

export const errorMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) => {
  if (err instanceof ErrorException) {
    res.status(err.status).send(err);
  } else {
    res.status(500).send({ code: ErrorCode.UnknowError, status: 500 } as ErrorModel);
  }
};
