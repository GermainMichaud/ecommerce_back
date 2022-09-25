import { Application } from 'express';

import healthcheckRoutes from './healthcheck.routes';

const loadRoutes = (app: Application) => {
  app.use('/api', [healthcheckRoutes]);
};

export default loadRoutes;
