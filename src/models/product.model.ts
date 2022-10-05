import {
  DocumentType,
  getModelForClass,
  Prop,
  PropType,
  Ref,
} from '@typegoose/typegoose';
import { Types } from 'mongoose';

import { Color } from './color.model';
import { Seller } from './seller.model';
import { Size } from './size.model';
import { Variant, VariantModel } from './variant.model';

class Product {
  @Prop({ required: true, type: String })
  public sku!: string;

  @Prop({ required: true, minlength: 3, maxlength: 50, type: String })
  public name!: string;

  @Prop({ type: String })
  public slug?: string;

  @Prop({ type: String })
  public description?: string;

  @Prop({ required: true, type: Number })
  public quantity!: number;

  @Prop({ required: true, type: String })
  public image!: string;

  @Prop({ type: () => [String] }, PropType.ARRAY)
  public images?: string[];

  @Prop({ type: Number })
  public rating?: number;

  @Prop({ type: [Types.ObjectId] }, PropType.ARRAY)
  public colors?: Ref<Color>[];

  @Prop({ type: [Types.ObjectId] }, PropType.ARRAY)
  public sizes?: Ref<Size>[];

  @Prop({ type: [Types.ObjectId] }, PropType.ARRAY)
  public variants?: Ref<Variant>[];

  @Prop({ type: Number })
  public price_start?: number;

  @Prop({ type: Types.ObjectId })
  public seller?: Ref<Seller>;

  public async addVariant(this: DocumentType<Product>, variant: Ref<Variant>) {
    this.variants?.push(variant);
    const variants = await VariantModel.find({ _id: { $in: this.variants } });
    this.price_start = Math.min(...variants.map((v) => v.price));
    await this.save();
  }

  public async addColor(this: DocumentType<Product>, color: Ref<Color>) {
    this.colors?.push(color);
    await this.save();
  }

  public async addSize(this: DocumentType<Product>, size: Ref<Size>) {
    this.sizes?.push(size);
    await this.save();
  }

  public async removeQuantity(this: DocumentType<Product>, quantity: number) {
    if (quantity > this.quantity) {
      throw new Error('Quantity is too high');
    }
    this.quantity -= quantity;
    await this.save();
  }
}

const ProductModel = getModelForClass(Product, {
  schemaOptions: {
    timestamps: true,
    collection: 'products',
    _id: true,
  },
});

export { Product, ProductModel };
