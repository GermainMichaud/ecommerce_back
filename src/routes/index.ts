import { Application, Router } from 'express';

import { cookie } from '../middlewares/cookie';
import cartRoutes from './cart.routes';
import healthcheckRoutes from './healthcheck.routes';
import orderRoutes from './order.routes';
import productRoutes from './product.routes';

const loadRoutes = (app: Application) => {
  const router = Router();
  router.use('/healthcheck', healthcheckRoutes);
  router.use('/products', cookie, productRoutes);
  router.use('/carts', cookie, cartRoutes);
  router.use('/orders', cookie, orderRoutes);
  app.use('/api', router);
};

export default loadRoutes;
