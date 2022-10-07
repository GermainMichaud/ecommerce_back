import { DocumentType } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import slugify from 'slugify';

import { ColorModel } from '../models/color.model';
import { Product, ProductModel } from '../models/product.model';
import { SellerModel } from '../models/seller.model';
import { SizeModel } from '../models/size.model';
import { VariantModel } from '../models/variant.model';
import { CreateProductInput } from '../schemas/product.schema';
import log from '../utils/logger';

export const getProducts = async (): Promise<DocumentType<Product>[]> => {
  log.info('Getting all products');
  // eslint-disable-next-line no-useless-catch
  try {
    return await ProductModel.find({ quantity: { $gt: 0 } })
      .populate('seller', 'name currency ', SellerModel)
      .exec();
  } catch (error) {
    throw error;
  }
};

export const getProduct = async (
  id: string | Types.ObjectId,
): Promise<DocumentType<Product> | null> => {
  const product = await ProductModel.findById(id)
    .populate('variants', 'color size sku name price quantity', VariantModel)
    .populate({
      path: 'variants',
      populate: [
        { path: 'color', select: { code: 1, name: 1 }, model: ColorModel },
        { path: 'size', select: { code: 1, name: 1 }, model: SizeModel },
      ],
      model: VariantModel,
    })
    .populate('seller', 'name products', SellerModel)
    .populate({
      path: 'seller',
      populate: {
        path: 'products',
        select: { sku: 1, name: 1, image: 1, price: 1 },
        model: ProductModel,
      },
      model: SellerModel,
    })
    .populate('colors', 'name code', ColorModel)
    .populate('sizes', 'name code', SizeModel);
  return product;
};

export const getProductBySlug = async (
  slug: string,
): Promise<DocumentType<Product> | null> => {
  const product = await ProductModel.findOne({ slug })
    .populate('variants', 'color size sku name price quantity', VariantModel)
    .populate({
      path: 'variants',
      populate: [
        { path: 'color', select: { code: 1, name: 1 }, model: ColorModel },
        { path: 'size', select: { code: 1, name: 1 }, model: SizeModel },
      ],
      model: VariantModel,
    })
    .populate('seller', 'name products', SellerModel)
    .populate({
      path: 'seller',
      populate: {
        path: 'products',
        select: { sku: 1, name: 1, image: 1, price: 1 },
        model: ProductModel,
      },
      model: SellerModel,
    })
    .populate('colors', 'name code', ColorModel)
    .populate('sizes', 'name code', SizeModel);
  return product;
};

export const createProduct = async (
  data: CreateProductInput['body'],
): Promise<DocumentType<Product>> => {
  const product = await ProductModel.create({
    ...data,
    slug: slugify(data.name.toLowerCase(), { remove: /[%!,:@/]/g }) + '-' + data.sku,
  });
  return product;
};

export const removeQuantityFromProducts = async (
  quantities: Record<string, number>,
): Promise<void> => {
  const productIds = Object.keys(quantities);
  for (const id of productIds) {
    const product = await ProductModel.findById(id);
    if (!product) {
      throw new Error('Product not found');
    }
    await product.removeQuantity(quantities[id]);
  }
};
