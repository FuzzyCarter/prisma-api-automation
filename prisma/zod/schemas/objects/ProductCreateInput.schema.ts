import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProductCreateInput> = z
  .object({
    name: z.string(),
    description: z.string().optional().nullable(),
    price: z.number(),
  })
  .strict();

export const ProductCreateInputObjectSchema = Schema;
