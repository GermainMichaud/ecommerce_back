export interface IItem {
  _id: string;
  sku: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  color?: string;
  size?: string;
}

export interface ICart {
  token: string;
  items: IItem[];
  quantity: number;
  total: number;
  status: CartStatus;
}

export enum CartStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
}
