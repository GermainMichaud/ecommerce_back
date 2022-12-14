import {
  DocumentType,
  getModelForClass,
  ModelOptions,
  Prop,
  Severity,
} from '@typegoose/typegoose';
import { Schema, Types } from 'mongoose';

import { IColor } from '../interfaces/color';
import { ISize } from '../interfaces/size';

@ModelOptions({ options: { allowMixed: Severity.ALLOW } })
class CartItem {
  @Prop({ auto: true, type: Types.ObjectId })
  public _id: Types.ObjectId;

  @Prop({ required: true, type: String })
  public cartToken!: string;

  @Prop({ required: true, type: String })
  public sku!: string;

  @Prop({ required: true, type: Number, default: 1 })
  public quantity!: number;

  @Prop({ required: true, type: Number })
  public price!: number;

  @Prop({ required: true, type: String })
  public name!: string;

  @Prop({ required: true, type: String })
  public image!: string;

  @Prop({ type: Schema.Types.Mixed })
  public color?: IColor;

  @Prop({ type: Schema.Types.Mixed })
  public size?: ISize;

  public async increaseQuantity(this: DocumentType<CartItem>, quantity: number) {
    this.quantity += quantity;
    await this.save();
  }

  public async decreaseQuantity(this: DocumentType<CartItem>) {
    this.quantity -= 1;
    await this.save();
  }
}

const CartItemModel = getModelForClass(CartItem, {
  schemaOptions: {
    timestamps: true,
    collection: 'cartItems',
  },
});

export { CartItem, CartItemModel };
