import { IColor } from './color';
import { ISize } from './size';

export interface IVariant {
  id: number;
  name: string;
  description: string;
  product_id: number;
  image: string;
  color: IColor;
  size: ISize;
  quantity: number;
  price: number;
}
