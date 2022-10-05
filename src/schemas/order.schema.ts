import { array, number, object, string, TypeOf } from 'zod';

const createOrderInput = object({
  body: object({
    items: array(
      object({
        productId: string(),
        _id: string(),
        quantity: number(),
        price: number(),
        sku: string(),
        sellerId: string(),
      }),
    ),
    userInfos: object({
      firstname: string(),
      lastname: string(),
      email: string(),
      address: string(),
      city: string(),
      postal_code: string(),
      country: string(),
      payment_method: string(),
    }),
  }),
});

type CreateOrderInput = TypeOf<typeof createOrderInput>;

export { CreateOrderInput, createOrderInput };
