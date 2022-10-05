/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';

import {
  getProductBySlugHandler,
  getProductHandler,
  getProductsHandler,
} from '../controllers/product.controller';
import validate from '../middlewares/validateRequest';
import { getProductByIdSchema, getProductBySlugSchema } from '../schemas/product.schema';

const router = Router();

router.get('/', getProductsHandler);
router.get('/slug/:slug', validate(getProductBySlugSchema), getProductBySlugHandler);
router.get('/:id', validate(getProductByIdSchema), getProductHandler);

// router.use('/products', router);

export default router;
