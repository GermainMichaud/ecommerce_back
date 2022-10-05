import { DocumentType, getModelForClass, Prop, Ref } from '@typegoose/typegoose';
import { Types } from 'mongoose';

import { Product } from './product.model';

class Seller {
  @Prop({ required: true, type: String })
  public name!: string;

  @Prop({ required: true, type: String })
  public email!: string;

  @Prop({ required: true, type: String })
  public phone!: string;

  @Prop({ required: true, type: String })
  public address!: string;

  @Prop({ required: true, type: String })
  public city!: string;

  @Prop({ required: true, type: String })
  public state!: string;

  @Prop({ required: true, type: String })
  public country!: string;

  @Prop({ required: true, type: String })
  public zip_code!: string;

  @Prop({ required: true, type: Number })
  public tax!: number;

  @Prop({ required: true, type: String })
  public currency!: string;

  @Prop({ required: true, type: String })
  public currency_symbol!: string;

  @Prop({ required: true, type: String })
  public image!: string;

  @Prop({ type: Types.ObjectId })
  public products?: Ref<Product>[];

  @Prop({ required: true, type: Number })
  public rating!: number;

  public async addProduct(this: DocumentType<Seller>, product: Ref<Product>) {
    this.products?.push(product);
    await this.save();
  }
}

// class Seller {
//   @Prop({ required: true, minlength: 3, maxlength: 50, type: String })
//   public name: string;

//   @Prop({ required: true, minlength: 3, maxlength: 50, type: String })
//   public email: string;

//   @Prop({ required: true, minlength: 3, maxlength: 50, type: String })
//   public password: string;

//   @Prop({ required: true, type: String })
//   public seller: {
//     name: string;
//     logo: string;
//     description: string;
//     rating: number;
//     numReviews: number;
//   };
// }

const SellerModel = getModelForClass(Seller, {
  schemaOptions: {
    timestamps: true,
    collection: 'sellers',
  },
});

export { Seller, SellerModel };
