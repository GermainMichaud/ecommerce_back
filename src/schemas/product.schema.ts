import { isValidObjectId } from 'mongoose';
import { TypeOf, z } from 'zod';

const createProductInput = z.object({
  body: z.object({
    sku: z.string({
      required_error: 'SKU is required',
      description: 'SKU of the product',
    }),
    name: z.string({
      required_error: 'Name is required',
      description: 'Name of the product',
    }),
    description: z
      .string({
        description: 'Description of the product',
      })
      .optional()
      .default(''),
    price_start: z
      .number({
        description: 'Price of the product in cents',
      })
      .min(0)
      .optional(),
    quantity: z
      .number({
        description: 'Quantity of the product',
      })
      .optional()
      .default(0),
    image: z.string({
      required_error: 'Image is required',
      description: 'Image of the product',
    }),
    images: z.array(z.string().optional()).optional(),
    category: z.array(z.string().optional()).optional(),
    sizes: z.array(z.string()).optional(),
    colors: z.array(z.string()).optional(),
    variants: z.array(z.string()).optional(),
    rating: z.number().optional().default(0),
    seller: z.string().optional(),
  }),
});

const getProductByIdSchema = z.object({
  params: z.object({
    id: z
      .string()
      .min(1)
      .refine((value) => {
        return isValidObjectId(value);
      }, "L'ID n'est pas valide"),
  }),
});

const getProductBySlugSchema = z.object({
  params: z.object({
    slug: z.string().trim().min(5),
  }),
});

const updateProductQuantityInput = z.object({
  quantity: z.number(),
});

type CreateProductInput = TypeOf<typeof createProductInput>;
type GetProductByIdSchema = TypeOf<typeof getProductByIdSchema>;
type GetProductBySlugSchema = TypeOf<typeof getProductBySlugSchema>;

export {
  CreateProductInput,
  createProductInput,
  GetProductByIdSchema,
  getProductByIdSchema,
  GetProductBySlugSchema,
  getProductBySlugSchema,
  updateProductQuantityInput,
};
