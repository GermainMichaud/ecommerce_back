import { DocumentType } from '@typegoose/typegoose';

import { Variant, VariantModel } from '../models/variant.model';
import { CreateOrderInput } from '../schemas/order.schema';
import { CreateVariantInput } from '../schemas/variant.schema';

export const createVariant = async (
  input: CreateVariantInput,
): Promise<DocumentType<Variant>> => {
  const variant = await VariantModel.create(input);
  return variant;
};

export const removeQuantityFromVariants = async (
  items: CreateOrderInput['body']['items'],
): Promise<Record<string, number>> => {
  const productsQuantity: Record<string, number> = {};
  for (const item of items) {
    const variant = await VariantModel.findById(item._id);
    if (!variant) {
      throw new Error('Variant not found');
    }
    await variant.removeQuantity(item.quantity);
    productsQuantity[item.productId] =
      (productsQuantity[item.productId] || 0) + item.quantity;
  }
  return productsQuantity;
};
