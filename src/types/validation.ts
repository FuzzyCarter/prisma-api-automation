import { z } from 'zod';

// Base user schema without ID
export const userBaseSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  address: z.string(),
});

// Schema for creating a new user (input)
export const createUserSchema = userBaseSchema;

// Schema for user with ID (output)
export const userSchema = userBaseSchema.extend({
  id: z.number(),
});

// Base product schema without ID
export const productBaseSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number().positive(),
});

// Schema for creating a new product (input)
export const createProductSchema = productBaseSchema;

// Schema for product with ID (output)
export const productSchema = productBaseSchema.extend({
  id: z.number(),
});

export const updateUserSchema = createUserSchema.partial();
export const updateProductSchema = createProductSchema.partial();

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>; 