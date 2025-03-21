import { z } from 'zod';
import { ProductSelectObjectSchema } from './objects/ProductSelect.schema';
import { ProductWhereUniqueInputObjectSchema } from './objects/ProductWhereUniqueInput.schema';

export const ProductFindUniqueSchema = z.object({
  select: ProductSelectObjectSchema.optional(),
  where: ProductWhereUniqueInputObjectSchema,
});
