import { z } from 'zod';

export const produtoQuerySchema = z.object({
  search: z.string().optional(),
  categoria: z.string().optional(),
  precoMin: z.coerce.number().nonnegative().optional(),
  precoMax: z.coerce.number().nonnegative().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
});




