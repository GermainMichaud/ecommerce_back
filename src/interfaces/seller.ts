import { IProduct } from './product';

export interface ISeller {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zip_code: string;
  shipping_cost: number;
  tax: number;
  currency: string;
  currency_symbol: string;
  image: string;
  images: string[];
  products?: IProduct[];
  rating: number;
}
