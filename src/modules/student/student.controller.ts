import { Request, RequestHandler, Response } from 'express'
import catchAsync from '../../share/catchAsync'
import sendResponse from '../../share/sendResponse'
import httpStatus from 'http-status'
import pick from '../../share/pick'
import { paginationFields } from '../../constants/pagination'
import { IStudent } from './student.interface'
import { studentFilterableFields } from './student.constant'
import { StudentService } from './student.service'

const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, studentFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)
  const result = await StudentService.getAllStudents(filters, paginationOptions)

  sendResponse<IStudent[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User fetched successfully!',
    meta: result.meta,
    data: result.data,
  })
})
const getSingleStudent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const result = await StudentService.getSingleStudent(id)

    sendResponse<IStudent>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User fetched successfully!',
      data: result,
    })
  },
)

const updateStudent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const updatedData = req.body

    const result = await StudentService.updateStudent(id, updatedData)

    sendResponse<IStudent>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User updated successfully!',
      data: result,
    })
  },
)

const deleteStudent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const result = await StudentService.deleteStudent(id)

    sendResponse<IStudent>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student deleted successfully!',
      data: result,
    })
  },
)

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
}
