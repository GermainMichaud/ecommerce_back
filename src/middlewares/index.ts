import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';
import session from 'express-session';
import helmet from 'helmet';
import { nanoid } from 'nanoid';

const loadMiddlewares = (app: Application) => {
  app.use(helmet());
  app.use(
    cors({
      origin: ['http://localhost:3000'],
      credentials: true,
    }),
  );
  app.use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7 * 1000, // 1 week
        path: '/',
      },
      genid: () => {
        return nanoid(64);
      },
    }),
  );
  app.use(cookieParser('secret'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(compression());
};

export default loadMiddlewares;
