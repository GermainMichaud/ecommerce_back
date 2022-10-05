import { IColor } from './color';
import { ISeller } from './seller';
import { ISize } from './size';
import { IVariant } from './variant';

export interface IProduct {
  id: number;
  name: string;
  quantity: number;
  image: string;
  images?: string[];
  seller?: ISeller;
  rating: number;
  colors: IColor[];
  sizes: ISize[];
  variant?: IVariant[];
  price_start: number;
}
