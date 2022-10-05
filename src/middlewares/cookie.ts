import { NextFunction, Request, Response } from 'express';
import { nanoid } from 'nanoid';

export const cookie = (req: Request, res: Response, next: NextFunction) => {
  const cookie = req.cookies.ecommerce;
  if (!cookie) {
    res.cookie('ecommerce', nanoid(), {
      maxAge: 60 * 60 * 24 * 7 * 1000, // 1 week
      httpOnly: true,
    });
  }
  res.locals.cookie = cookie;
  next();
};
