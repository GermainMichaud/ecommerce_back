import { z } from 'zod';

const createColorInput = z.object({
  name: z.string({
    required_error: 'Name is required',
    description: 'Name of the color',
  }),
  code: z.string({
    required_error: 'Code is required',
    description: 'Code of the color',
  }),
  product: z.string().optional(),
});

export type CreateColorInput = z.infer<typeof createColorInput>;

export { createColorInput };
