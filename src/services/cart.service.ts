import mongoose from 'mongoose';

import { Cart, CartModel } from '../models/cart.model';
import { CartItemModel } from '../models/cartItem.model';
import { ColorModel } from '../models/color.model';
import { SizeModel } from '../models/size.model';
import { Variant, VariantModel } from '../models/variant.model';

export const getCart = async (token: string): Promise<Cart> => {
  const cart = await CartModel.findOne({ token })
    .populate('products', 'sku quantity price name image', CartItemModel)
    .populate({
      path: 'products',
      populate: [
        { path: 'color', select: { code: 1, name: 1, _id: -1 }, model: ColorModel },
        { path: 'size', select: { code: 1, name: 1, id: -1 }, model: SizeModel },
      ],
      model: CartItemModel,
    });
  if (!cart) {
    throw new Error('Cart not found');
  }
  return cart;
};

export const validateCart = async (items: Partial<Variant>[]): Promise<unknown> => {
  const errors = {};
  const itemIds = items.map((item) => new mongoose.Types.ObjectId(item._id as string));
  const variants = await VariantModel.find({
    _id: { $in: itemIds },
  });
  if (variants.length !== items.length) {
    const variantsIds = variants.map((variant) => variant._id);
    const itemsIdsNotFound = itemIds.filter((itemId) => !variantsIds.includes(itemId));
    for (const itemId of itemsIdsNotFound) {
      errors[itemId as string] = 'Product not found';
    }
    return errors;
  }
  for (const item of items) {
    const variant = variants.find(
      (variant) => variant.toObject()._id.toString() === item._id,
    );
    if (item?.quantity > (variant?.quantity || -1)) {
      errors[item._id as string] = 'Not enough stock for this product';
    }
  }
  return errors;
};

export const createCart = async (token: string): Promise<Cart> => {
  const cartExists = await CartModel.findOne({ token });
  if (cartExists) {
    return cartExists;
  }
  await CartModel.create({ token });
  return getCart(token);
};

export const clearCart = async (token: string): Promise<Cart> => {
  const cart = await getCart(token);
  await cart.clearCart();
  return getCart(token);
};

export const addItem = async (
  token: string,
  sku: string,
  quantity = 1,
): Promise<Cart> => {
  const cart = await getCart(token);
  const item = await VariantModel.findOne({ sku })
    .populate('color', 'name code -_id', ColorModel)
    .populate('size', 'name code -_id', SizeModel);
  if (!item) {
    throw new Error('Item not found');
  }
  await cart.addItem({
    sku: item.sku,
    name: item.name,
    price: item.price,
    quantity,
    color: item.color,
    size: item.size,
    image: item.image,
  });
  return getCart(token);
};

export const removeItem = async (token: string, sku: string): Promise<Cart> => {
  const cart = await getCart(token);
  const item = await VariantModel.findOne({ sku });
  if (!item) {
    throw new Error('Item not found');
  }
  await cart.removeItem(item.sku);
  return getCart(token);
};

export const increaseQuantity = async (token: string, sku: string): Promise<Cart> => {
  const cart = await getCart(token);
  const item = await VariantModel.findOne({ sku });
  if (!item) {
    throw new Error('Item not found');
  }
  await cart.increaseQuantity(item);
  return getCart(token);
};

export const decreaseQuantity = async (token: string, sku: string): Promise<Cart> => {
  const cart = await getCart(token);
  const item = await VariantModel.findOne({ sku });
  if (!item) {
    throw new Error('Item not found');
  }
  await cart.decreaseQuantity(item);
  return getCart(token);
};
