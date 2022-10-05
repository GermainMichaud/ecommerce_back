import { z } from 'zod';

const createVariantInput = z.object({
  sku: z.string({
    required_error: 'SKU is required',
    description: 'SKU of the variant',
  }),
  isDefault: z
    .boolean({
      description: 'Is the default variant of the product',
    })
    .optional(),
  name: z.string({
    required_error: 'Name is required',
    description: 'Name of the variant',
  }),
  description: z
    .string({
      description: 'Description of the variant',
    })
    .optional()
    .default(''),
  price: z
    .number({
      required_error: 'Price is required',
      description: 'Price of the variant in cents',
    })
    .min(0),
  quantity: z
    .number({
      required_error: 'Quantity is required',
      description: 'Quantity of the variant',
    })
    .min(0),
  image: z.string({
    required_error: 'Image is required',
    description: 'Image of the variant',
  }),
  color: z.string().optional(),
  size: z.string().optional(),
  product: z
    .string({
      required_error: 'Product ID is required',
      description: 'The product ID',
    })
    .optional(),
});

export type CreateVariantInput = z.infer<typeof createVariantInput>;

export { createVariantInput };
