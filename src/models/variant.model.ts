import { DocumentType, getModelForClass, Prop, Ref } from '@typegoose/typegoose';
import { Types } from 'mongoose';

import { Color } from './color.model';
import { Product } from './product.model';
import { Size } from './size.model';

class Variant {
  @Prop({ required: true, type: String })
  public sku: string;

  @Prop({ required: true, type: String })
  public name: string;

  @Prop({ type: Boolean, default: false })
  public isDefault: boolean;

  @Prop({ type: Types.ObjectId })
  public product?: Ref<Product>;

  @Prop({ required: true, type: String })
  public image: string;

  @Prop({ type: Types.ObjectId })
  public color?: Ref<Color>;

  @Prop({ type: Types.ObjectId })
  public size?: Ref<Size>;

  @Prop({ required: true, type: Number })
  public quantity: number;

  @Prop({ required: true, type: Number })
  public price: number;

  public async addColor(this: DocumentType<Variant>, color: Ref<Color>) {
    this.color = color;
    await this.save();
  }

  public async addSize(this: DocumentType<Variant>, size: Ref<Size>) {
    this.size = size;
    await this.save();
  }

  public async removeQuantity(this: DocumentType<Variant>, quantity: number) {
    if (quantity > this.quantity) {
      throw new Error('Quantity too hight');
    }
    this.quantity -= quantity;
    await this.save();
  }
}

const VariantModel = getModelForClass(Variant, {
  schemaOptions: {
    timestamps: true,
    collection: 'variants',
  },
});

export { Variant, VariantModel };
