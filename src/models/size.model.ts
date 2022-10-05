import { getModelForClass, Prop, Ref } from '@typegoose/typegoose';
import { Types } from 'mongoose';

import { Product } from './product.model';

class Size {
  @Prop({ required: true, type: String })
  public name: string;

  @Prop({ required: true, type: String })
  public code: string;

  @Prop({ type: Types.ObjectId })
  public product?: Ref<Product>;
}

const SizeModel = getModelForClass(Size, {
  schemaOptions: {
    timestamps: false,
    collection: 'sizes',
  },
});

export { Size, SizeModel };
