import { getModelForClass, Prop, Ref } from '@typegoose/typegoose';
import { Types } from 'mongoose';

import { Product } from './product.model';

class Color {
  @Prop({ auto: true, type: Types.ObjectId })
  public _id: Types.ObjectId;

  @Prop({ required: true, type: String })
  public name: string;

  @Prop({ required: true, type: String })
  public code: string;

  @Prop({ type: Types.ObjectId })
  public product?: Ref<Product>;
}

const ColorModel = getModelForClass(Color, {
  schemaOptions: {
    timestamps: false,
    collection: 'colors',
  },
});

export { Color, ColorModel };
