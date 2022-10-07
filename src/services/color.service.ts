import { DocumentType } from '@typegoose/typegoose';
import { Types } from 'mongoose';

import { Color, ColorModel } from '../models/color.model';
import { CreateColorInput } from '../schemas/color.schema';

export const createColor = async (
  input: CreateColorInput,
): Promise<DocumentType<Color>> => {
  const color = await ColorModel.create(input);
  return color;
};

export const getAllProductColors = async (
  productId: Types.ObjectId,
): Promise<DocumentType<Color>[]> => {
  const colors = await ColorModel.find({
    product: productId,
  });
  return colors || [];
};
