import { getModelForClass, Prop, Ref } from '@typegoose/typegoose';
import mongoose, { Schema, Types } from 'mongoose';

import { OrderStatus, OrderUserInfo, PaymentMethod } from '../interfaces/order';

class Order {
  @Prop({ required: true, type: String })
  public orderToken!: string;

  @Prop({ required: true, type: Schema.Types.Mixed })
  public items!: {
    name: string;
    sku: string;
    product: mongoose.Types.ObjectId;
    _id: mongoose.Types.ObjectId;
    sellerId: Types.ObjectId;
    quantity: number;
    price: number;
  }[];

  @Prop({ required: true, type: Schema.Types.Mixed })
  public userInfos!: OrderUserInfo;

  @Prop({ required: true, type: String, enum: PaymentMethod })
  public paymentMethod!: string;

  @Prop({ required: true, type: String, enum: OrderStatus })
  public paymentStatus!: string;
}

const OrderModel = getModelForClass(Order, {
  schemaOptions: {
    timestamps: true,
    collection: 'orders',
  },
});

export { Order, OrderModel };
