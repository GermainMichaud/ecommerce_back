import express from 'express';

import loadMiddlewares from './middlewares';
import { errorMiddleware } from './middlewares/error';
import loadRoutes from './routes';

declare module 'express-session' {
  interface SessionData {
    cart?: Record<string, unknown>;
  }
}

const createServer = () => {
  const app = express();

  loadMiddlewares(app);

  loadRoutes(app);

  app.use(errorMiddleware);

  return app;
};

export default createServer;
