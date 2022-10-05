import { Types } from 'mongoose';

import { OrderStatus, PaymentMethod } from '../interfaces/order';
import { Order, OrderModel } from '../models/order.model';
import { SellerModel } from '../models/seller.model';
import { CreateOrderInput } from '../schemas/order.schema';
import {
  sendOrderConfirmationEmailToCustomer,
  sendPurchaseOrderEmailToSeller,
} from '../utils/email';

export const getOrder = async (
  token: string,
  orderId?: string,
): Promise<Order | null> => {
  const filter = orderId ? { orderToken: token, orderId } : { orderToken: token };
  return await OrderModel.findOne(filter);
};

export const createOrder = async (
  token: string,
  cart: Record<string, any>,
  data: CreateOrderInput['body'],
  paymentStatus: OrderStatus,
): Promise<Order> => {
  const order = await OrderModel.create({
    ...data,
    orderToken: token,
    cart,
    paymentStatus,
    paymentMethod: data.userInfos.payment_method,
  });
  return order;
};

export const makePayment = async (
  orderId: string,
  paymentMethod: PaymentMethod,
  paymentStatus: OrderStatus,
): Promise<Order> => {
  const order = await OrderModel.findOneAndUpdate(
    { orderId },
    { paymentMethod, paymentStatus },
    { new: true },
  );
  if (!order) {
    throw new Error('Order not found');
  }
  return order;
};

export const sendOrderToSellers = async (order: Order): Promise<void> => {
  const userInfos = order.userInfos;
  const productBySeller = order.items.reduce(
    (acc, cur) => ({
      ...acc,
      [cur.sellerId.toString()]: [...(acc[cur.sellerId.toString()] || []), cur],
    }),
    {} as Record<string, Order['items']>,
  );
  const sellers = Object.keys(productBySeller);
  for (const sellerId of sellers) {
    const seller = await SellerModel.findById(sellerId);
    if (seller) {
      const products = productBySeller[sellerId];
      // send email to seller
      await sendPurchaseOrderEmailToSeller(
        seller,
        userInfos,
        products,
        order.paymentStatus,
      );
    }
  }
};

export const sendOrderToCustomer = async (order: Order): Promise<void> => {
  await sendOrderConfirmationEmailToCustomer(order);
};

export const fakeProcessPayment = (): boolean => {
  if (Math.random() < 0.33) {
    return false;
  }
  return true;
};
