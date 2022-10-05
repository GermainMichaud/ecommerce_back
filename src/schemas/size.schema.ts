import { z } from 'zod';

const createSizeInput = z.object({
  name: z.string({
    required_error: 'Name is required',
    description: 'Name of the size',
  }),
  code: z.string({
    required_error: 'Code is required',
    description: 'Code of the size',
  }),
  product: z.string().optional(),
});

export type CreateSizeInput = z.infer<typeof createSizeInput>;

export { createSizeInput };
