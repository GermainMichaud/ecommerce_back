import express from 'express';

import loadMiddlewares from './middlewares';
import loadRoutes from './routes';

const createServer = () => {
  const app = express();

  loadMiddlewares(app);

  loadRoutes(app);

  return app;
};

export default createServer;
