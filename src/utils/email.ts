import config from 'config';
import { Seller } from 'models/seller.model';
import nodemailer from 'nodemailer';

import { Order } from '../models/order.model';
import log from './logger';

export const sendOrderConfirmationEmailToCustomer = async (order: Order) => {
  try {
    const account = await nodemailer.createTestAccount();
    const createTransporter = nodemailer.createTransport(
      {
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
        logger: false,
        debug: false,
      },
      {
        from: `Ecommerce Application ${config.get<string>('email.from')}`,
      },
    );
    const mailOptions = {
      to: order.userInfos.email,
      subject: 'Order Confirmation',
      html: `
        <h1>Order Confirmation</h1>
        <p>Thank you for your order, ${order.userInfos.lastname} ${order.userInfos.firstname}.</p>
        <p>Your order number is: ${order.orderToken}</p>
        <p>Thank you for shopping with us.</p>
      `,
    };
    const info = await createTransporter.sendMail(mailOptions);
    log.info('Message sent: %s', info.messageId);
    log.info('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    throw new Error(error);
  }
};

export const sendPurchaseOrderEmailToSeller = async (
  sellerInfos: Seller,
  userInfos: {
    firstname: string;
    lastname: string;
    email: string;
    address: string;
    city: string;
    postal_code: string;
    country: string;
  },
  items: {
    product: string;
    _id: string;
    quantity: number;
    price: number;
    name: string;
  }[],
  orderStatus: string,
) => {
  try {
    const account = await nodemailer.createTestAccount();
    const createTransporter = nodemailer.createTransport(
      {
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
        logger: false,
        debug: false,
      },
      {
        from: `Ecommerce Application ${config.get<string>('email.from')}`,
      },
    );
    const mailOptions = {
      to: sellerInfos.email,
      subject: 'Purchase Order',
      html: `
        <h1>Purchase Order</h1>
        <p>Dear ${sellerInfos.name},</p>
        <p>You have received a new order from ${userInfos.lastname} ${
        userInfos.firstname
      }.</p>
        <p>Order details:</p>
        <ul>
          ${items
            .map(
              (item) => `
            <li>
              <p>${item.name}</p>
              <p>SKU: ${item.product} - ${item._id}</p>
              <p>Quantity: ${item.quantity}</p>
              <p>Price: ${item.price}</p>
            </li>
          `,
            )
            .join('')}
        </ul>
        <p>Order status: ${orderStatus}</p>
        <p>Thank you for your business.</p>
      `,
    };
    const info = await createTransporter.sendMail(mailOptions);
    log.info('Message sent to seller %s: %s', sellerInfos._id, info.messageId);
    log.info('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    throw new Error(error);
  }
};