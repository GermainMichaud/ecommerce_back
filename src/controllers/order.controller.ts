import { Request, Response } from 'express';

import { EmptyObject } from '../interfaces/common';
import { PaymentMethod } from '../interfaces/order';
import { CreateOrderInput } from '../schemas/order.schema';
// import { getCart } from '../services/cart.service';
import {
  createOrder,
  fakeProcessPayment,
  getOrder,
  makePayment,
  sendOrderToCustomer,
  sendOrderToSellers,
} from '../services/order.service';
import { removeQuantityFromProducts } from '../services/product.service';
import { removeQuantityFromVariants } from '../services/variant.service';
import log from '../utils/logger';

export const getOrderHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = await getOrder(req.cookies['ecommerce'] as string, id);
    if (!order) {
      throw new Error('Order not found');
    }
    res.json(order);
  } catch (error) {
    log.error(error);
    res.status(404).json({ error: error.message });
  }
};

export const createOrderHandler = async (
  req: Request<EmptyObject, EmptyObject, CreateOrderInput['body']>,
  res: Response,
) => {
  try {
    const cart = req.session.cart;
    if (!cart) {
      throw new Error('Cart not found');
    }
    let order = await getOrder(req.cookies['ecommerce'] as string);
    if (!order) {
      order = await createOrder(
        req.cookies['ecommerce'] as string,
        cart,
        req.body,
        'PENDING',
      );
    }
    // 1 on 3 change to fail
    const paymentAccepted = fakeProcessPayment();
    const paymentStatus = paymentAccepted ? 'COMPLETED' : 'FAILED';
    order.paymentStatus = paymentStatus;
    await order.save();
    if (!paymentAccepted) {
      return res.status(400).send('Payment has failed');
    }
    const productsQuantities = await removeQuantityFromVariants(req.body.items);
    await removeQuantityFromProducts(productsQuantities);
    await sendOrderToSellers(order);
    await sendOrderToCustomer(order);
    res.json(order);
  } catch (error) {
    log.error(error);
    res.status(404).json({ error: error.message });
  }
};

export const paymentHandler = async (
  req: Request<{ id: string; provider: PaymentMethod }>,
  res: Response,
) => {
  try {
    const { id, provider } = req.params;
    // Fake payment
    if (provider !== 'CREDIT_CARD') {
      res.status(500);
      throw new Error('Payment method not supported');
    }
    const order = await makePayment(id, provider);
    res.status(200).json(order);
  } catch (error) {
    log.error(error);
    res.status(404).json({ error: error.message });
  }
};
