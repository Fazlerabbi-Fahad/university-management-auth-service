import { z } from 'zod'

const createAcademicFacultySchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
  }),
})

const updateAcademicFacultySchema = z.object({
  body: z.object({
    title: z.string().optional(),
  }),
})

export const AcademicFacultyValidation = {
  createAcademicFacultySchema,
  updateAcademicFacultySchema,
}
