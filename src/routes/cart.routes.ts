/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';

import {
  addItemHandler,
  clearCartHandler,
  createCartHandler,
  decreaseQuantityHandler,
  getCartHandler,
  increaseQuantityHandler,
  removeItemHandler,
  validateCartHandler,
} from '../controllers/cart.controller';

const router = Router();

router.get('/', getCartHandler);
router.post('/', createCartHandler);
router.post('/add-item', addItemHandler);
router.post('/remove-item', removeItemHandler);
router.post('/clear-cart', clearCartHandler);
router.post('/increase-quantity', increaseQuantityHandler);
router.post('/decrease-quantity', decreaseQuantityHandler);
router.post('/validate', validateCartHandler);

// router.use('/carts', router);

export default router;
