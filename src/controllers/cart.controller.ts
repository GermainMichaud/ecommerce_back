import { Request, Response } from 'express';
import { EmptyObject } from 'interfaces/common';
import { nanoid } from 'nanoid';

import { BodyWithSku, BodyWithSkuAndQuantity } from '../schemas/cart.schema';
import {
  addItem,
  clearCart,
  createCart,
  decreaseQuantity,
  getCart,
  increaseQuantity,
  removeItem,
  validateCart,
} from '../services/cart.service';
import log from '../utils/logger';

export const getCartHandler = async (req: Request, res: Response) => {
  try {
    const cart = await getCart(req.cookies.ecommerce as string);
    res.json(cart);
  } catch (error) {
    log.error(error);
    res.status(404).json({ error: error.message });
  }
};

export const validateCartHandler = async (req: Request, res: Response) => {
  const { items } = req.body;
  try {
    if (!items.length) {
      throw new Error('Cart is empty');
    }
    const errors = await validateCart(items);
    if (Object.keys(errors).length) {
      return res.status(400).send(errors);
    }
    const cart = {
      id: nanoid(),
      errors,
      total: items.reduce((acc, cur) => acc + cur.quantity * cur.price, 0),
    };
    req.session.cart = cart;
    return res.json(cart);
  } catch (error) {
    log.error(error);
    res.status(500).send(error);
  }
};

export const createCartHandler = async (req: Request, res: Response) => {
  const cart = await createCart(req.cookies.ecommerce as string);
  res.json(cart);
};

export const clearCartHandler = async (req: Request, res: Response) => {
  const cart = await clearCart(req.cookies.ecommerce as string);
  res.json(cart);
};

export const addItemHandler = async (
  req: Request<EmptyObject, EmptyObject, BodyWithSkuAndQuantity>,
  res: Response,
) => {
  const cart = await addItem(
    req.cookies.ecommerce as string,
    req.body.sku,
    req.body.quantity,
  );
  res.json(cart);
};

export const removeItemHandler = async (
  req: Request<EmptyObject, EmptyObject, BodyWithSku>,
  res: Response,
) => {
  try {
    const cart = await removeItem(req.cookies.ecommerce as string, req.body.sku);
    res.json(cart);
  } catch (error) {
    log.error(error);
    res.status(404).json({ error: error.message });
  }
};

export const increaseQuantityHandler = async (
  req: Request<EmptyObject, EmptyObject, BodyWithSku>,
  res: Response,
) => {
  try {
    const cart = await increaseQuantity(req.cookies.ecommerce as string, req.body.sku);
    res.json(cart);
  } catch (error) {
    log.error(error);
    res.status(404).json({ error: error.message });
  }
};

export const decreaseQuantityHandler = async (
  req: Request<EmptyObject, EmptyObject, BodyWithSku>,
  res: Response,
) => {
  try {
    const cart = await decreaseQuantity(req.cookies.ecommerce as string, req.body.sku);
    res.json(cart);
  } catch (error) {
    log.error(error);
    res.status(404).json({ error: error.message });
  }
};
