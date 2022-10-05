import mongoose from 'mongoose';

export const isObjectId = (id: string): boolean => {
  return mongoose.isValidObjectId(id);
};

export const randomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
