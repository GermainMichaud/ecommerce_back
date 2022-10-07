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

export const getProductsHandler = async (req: Request, res: Response) => {
  const products = await getProducts();
  res.json(products);
};

export const getProductHandler = async (
  req: Request<GetProductByIdSchema['params']>,
  res: Response,
): Promise<Response> => {
  const { id } = req.params;
  const product = await getProduct(id);
  if (!product) {
    res.status(404);
    return res.json({ message: 'Product not found' });
  }
  return res.json(product);
};

export const getProductBySlugHandler = async (
  req: Request<GetProductBySlugSchema['params']>,
  res: Response,
) => {
  const { slug } = req.params;
  const product = await getProductBySlug(slug);
  if (!product) {
    res.status(404);
    return res.json({ message: 'Product not found' });
  }
  res.json(product);
};

export const createProductHandler = async (
  req: Request<EmptyObject, EmptyObject, CreateProductInput['body']>,
  res: Response,
): Promise<void> => {
  const product = await createProduct(req.body);
  res.send(product);
};
