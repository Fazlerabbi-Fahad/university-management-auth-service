import { z } from 'zod'

const createUserSchema = z.object({
  body: z.object({
    role: z.string({
      required_error: 'Role is required',
    }),
    password: z.string().optional(),
  }),
})

const updateUserSchema = z.object({
  body: z.object({
    role: z.string().optional(),
    password: z.string().optional(),
  }),
})

export const UserValidation = {
  createUserSchema,
  updateUserSchema,
}
