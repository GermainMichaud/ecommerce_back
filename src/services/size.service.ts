import { DocumentType } from '@typegoose/typegoose';
import { Types } from 'mongoose';

import { Size, SizeModel } from '../models/size.model';
import { CreateSizeInput } from '../schemas/size.schema';

export const createSize = async (input: CreateSizeInput): Promise<DocumentType<Size>> => {
  const size = await SizeModel.create(input);
  return size;
};

export const getAllProductSizes = async (
  productId: Types.ObjectId,
): Promise<DocumentType<Size>[]> => {
  const sizes = await SizeModel.find({
    product: productId,
  });
  return sizes || [];
};
