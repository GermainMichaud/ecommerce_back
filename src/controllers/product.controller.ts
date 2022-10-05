import { Request, Response } from 'express';

import { EmptyObject } from '../interfaces/common';
import {
  CreateProductInput,
  GetProductByIdSchema,
  GetProductBySlugSchema,
} from '../schemas/product.schema';
import {
  createProduct,
  getProduct,
  getProductBySlug,
  getProducts,
} from '../services/product.service';
import log from '../utils/logger';

export const getProductsHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await getProducts();
    res.json(products);
  } catch (error) {
    log.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const getProductHandler = async (
  req: Request<GetProductByIdSchema['params']>,
  res: Response,
): Promise<Response> => {
  try {
    const { id } = req.params;
    const product = await getProduct(id);
    if (!product) {
      res.status(404);
      return res.json({ message: 'Product not found' });
    }
    return res.json(product);
  } catch (error) {
    log.error(error);
    return res.json(error);
  }
};

export const getProductBySlugHandler = async (
  req: Request<GetProductBySlugSchema['params']>,
  res: Response,
): Promise<Response> => {
  try {
    const { slug } = req.params;
    const product = await getProductBySlug(slug);
    if (!product) {
      res.status(404);
      return res.json({ message: 'Product not found' });
    }
    return res.json(product);
  } catch (error) {
    log.error(error);
    return res.json(error);
  }
};

export const createProductHandler = async (
  req: Request<EmptyObject, EmptyObject, CreateProductInput['body']>,
  res: Response,
): Promise<void> => {
  const product = await createProduct(req.body);
  res.send(product);
};
