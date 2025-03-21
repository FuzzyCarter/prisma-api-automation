import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ProductCountAggregateInputType> = z
  .object({
    id: z.literal(true).optional(),
    name: z.literal(true).optional(),
    description: z.literal(true).optional(),
    price: z.literal(true).optional(),
    _all: z.literal(true).optional(),
  })
  .strict();

export const ProductCountAggregateInputObjectSchema = Schema;
