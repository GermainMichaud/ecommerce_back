import { Seller, SellerModel } from '../models/seller.model';
import { CreateSellerInput } from '../schemas/seller.schema';

export const createSeller = async (input: CreateSellerInput): Promise<Seller> => {
  const seller = await SellerModel.create(input);
  return seller;
};
