/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';

import { createOrderHandler, getOrderHandler } from '../controllers/order.controller';
import validate from '../middlewares/validateRequest';
import { createOrderInput } from '../schemas/order.schema';

const router = Router();

router.get('/', getOrderHandler);
router.post('/', validate(createOrderInput), createOrderHandler);

// router.use('/orders', router);

export default router;
