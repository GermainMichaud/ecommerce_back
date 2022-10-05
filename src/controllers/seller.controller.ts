import { Request, Response } from 'express';

import { SellerModel } from '../models/seller.model';

export const createSeller = async (req: Request, res: Response): Promise<void> => {
  const seller = new SellerModel(req.body);
  const newSeller = await seller.save();
  res.send(newSeller);
};
