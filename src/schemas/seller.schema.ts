import { z } from 'zod';

const createSellerInput = z.object({
  name: z.string({
    required_error: 'Name is required',
  }),
  email: z.string({
    required_error: 'Email is required',
  }),
  phone: z.string({
    required_error: 'Phone is required',
  }),
  address: z.string({
    required_error: 'Address is required',
  }),
  city: z.string({
    required_error: 'City is required',
  }),
  state: z.string({
    required_error: 'State is required',
  }),
  country: z.string({
    required_error: 'Country is required',
  }),
  zip_code: z.string({
    required_error: 'Zip code is required',
  }),
  tax: z.number({
    required_error: 'Tax is required',
  }),
  currency: z.string({
    required_error: 'Currency is required',
  }),
  currency_symbol: z.string({
    required_error: 'Currency symbol is required',
  }),
  image: z.string({
    required_error: 'Image is required',
  }),
  products: z.array(z.string()).optional(),
  rating: z.number().optional().default(0),
});

export type CreateSellerInput = z.infer<typeof createSellerInput>;

export { createSellerInput };
