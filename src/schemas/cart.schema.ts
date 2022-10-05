import { z } from 'zod';

const getCartParams = z.object({
  sku: z.string(),
});

const bodyWithSku = z.object({
  sku: z.string(),
});

const bodyWithSkuAndQuantity = z.object({
  sku: z.string(),
  quantity: z.number().optional(),
});

type GetCartParams = z.infer<typeof getCartParams>;
type BodyWithSku = z.infer<typeof bodyWithSku>;
type BodyWithSkuAndQuantity = z.infer<typeof bodyWithSkuAndQuantity>;

export {
  BodyWithSku,
  bodyWithSku,
  BodyWithSkuAndQuantity,
  bodyWithSkuAndQuantity,
  GetCartParams,
  getCartParams,
};
