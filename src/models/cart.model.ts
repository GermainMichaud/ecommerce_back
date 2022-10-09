/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { DocumentType, getModelForClass, Prop, Ref } from '@typegoose/typegoose';
import { Types } from 'mongoose';

import { CartStatus } from '../interfaces/cart';
import { CartItem, CartItemModel } from './cartItem.model';
import { Variant } from './variant.model';

class Cart {
  @Prop({ auto: true, type: Types.ObjectId })
  public _id: Types.ObjectId;

  @Prop({ required: true, type: String, unique: true })
  public token!: string;

  @Prop({ type: [String] })
  public products?: Ref<CartItem>[];

  @Prop({ type: String, default: CartStatus.PENDING, enum: CartStatus })
  public status?: CartStatus;

  @Prop({ type: Number, default: 0 })
  public total?: number;

  @Prop({ type: Number, default: 0 })
  public quantity?: number;

  public async addItem(this: DocumentType<Cart>, item: Partial<Variant>) {
    const itemExists = await CartItemModel.findOne({
      sku: item.sku,
      cartToken: this.token,
    });
    if (itemExists) {
      const itemExistsQuantity = itemExists.quantity;
      const previousItemTotal = itemExistsQuantity * itemExists.price;
      const newItemTotal = (item.quantity! + itemExists.quantity) * item.price!;
      await itemExists.increaseQuantity(item.quantity!);
      this.total = (this.total || 0) + newItemTotal - previousItemTotal;
      this.quantity = (this.quantity || 0) + item.quantity!;
    } else {
      const newItem = await CartItemModel.create({
        ...item,
        cartToken: this.token,
      });
      this.products?.push(newItem);
      this.total = (this.total || 0) + item.price! * item.quantity!;
      this.quantity = (this.quantity || 0) + item.quantity!;
    }
    await this.save();
    return this;
  }

  public async removeItem(this: DocumentType<Cart>, sku: string) {
    const itemInCart = await CartItemModel.findOne({ sku, cartToken: this.token });
    if (!itemInCart) {
      throw new Error("Item doesn't exist in cart");
    }
    this.total = (this.total || 0) - itemInCart.price * itemInCart.quantity;
    this.quantity = (this.quantity || 0) - itemInCart.quantity;
    await itemInCart.remove();
    await this.save();
    return this;
  }

  public async increaseQuantity(this: DocumentType<Cart>, item: Variant) {
    const itemInCart = await CartItemModel.findOne({
      sku: item.sku,
      cartToken: this.token,
    });
    if (!itemInCart) {
      throw new Error("Item doesn't exist in cart");
    } else {
      await itemInCart.increaseQuantity(1);
      this.total = (this.total || 0) + item.price;
      this.quantity = (this.quantity || 0) + 1;
      await this.save();
    }
    return this;
  }

  public async decreaseQuantity(this: DocumentType<Cart>, item: Variant) {
    const itemInCart = await CartItemModel.findOne({
      sku: item.sku,
      cartToken: this.token,
    });
    if (!itemInCart) {
      throw new Error("Item doesn't exist in cart");
    } else {
      await itemInCart.decreaseQuantity();
      if (itemInCart.quantity === 0) {
        await this.removeItem(item.sku);
      }
      this.total = (this.total || 0) - item.price;
      this.quantity = (this.quantity || 0) - 1;
      await this.save();
    }
    return this;
  }

  public async clearCart(this: DocumentType<Cart>) {
    await CartItemModel.deleteMany({ cartToken: this.token });
    this.products = [];
    this.total = 0;
    this.quantity = 0;
    this.status = CartStatus.PENDING;
    await this.save();
    return this;
  }

  public async completeCart(this: DocumentType<Cart>) {
    this.status = CartStatus.COMPLETED;
    await this.save();
    return this;
  }
}

const CartModel = getModelForClass(Cart, {
  schemaOptions: {
    timestamps: true,
    collection: 'carts',
  },
});

export { Cart, CartModel };
