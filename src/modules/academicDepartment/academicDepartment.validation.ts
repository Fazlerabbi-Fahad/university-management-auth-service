import { z } from 'zod'

const createAcademicDepartmentSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    academicFaculty: z.string({
      required_error: 'Academic department is required',
    }),
  }),
})

const updateAcademicDepartmentSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    academicFaculty: z.string().optional(),
  }),
})

export const AcademicDepartmentValidation = {
  createAcademicDepartmentSchema,
  updateAcademicDepartmentSchema,
}
