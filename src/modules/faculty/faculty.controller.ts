import { Request, RequestHandler, Response } from 'express'
import catchAsync from '../../share/catchAsync'
import sendResponse from '../../share/sendResponse'
import httpStatus from 'http-status'
import pick from '../../share/pick'
import { paginationFields } from '../../constants/pagination'
import { facultyFilterableFields } from './faculty.constant'
import { IFaculty } from './faculty.interface'
import { FacultyService } from './faculty.service'

const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, facultyFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)
  const result = await FacultyService.getAllFaculty(filters, paginationOptions)

  sendResponse<IFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty fetched successfully!',
    meta: result.meta,
    data: result.data,
  })
})
const getSingleFaculty: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const result = await FacultyService.getSingleFaculty(id)

    sendResponse<IFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty fetched successfully!',
      data: result,
    })
  },
)

const updateFaculty: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const updatedData = req.body

    const result = await FacultyService.updateFaculty(id, updatedData)

    sendResponse<IFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty updated successfully!',
      data: result,
    })
  },
)

const deleteFaculty: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const result = await FacultyService.deleteFaculty(id)

    sendResponse<IFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty deleted successfully!',
      data: result,
    })
  },
)

export const FacultyController = {
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
}
