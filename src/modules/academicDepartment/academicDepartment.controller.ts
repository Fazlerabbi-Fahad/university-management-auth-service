import { Request, Response } from 'express'
import { AcademicDepartmentService } from './academicDepartment.service'
import sendResponse from '../../share/sendResponse'
import httpStatus from 'http-status'
import pick from '../../share/pick'
import catchAsync from '../../share/catchAsync'
import { IAcademicDepartment } from './academicDepartment.interface'
import { paginationFields } from '../../constants/pagination'
import { academicDepartmentFilterableFields } from './academicDepartment.constant'

const createAcademicDepartment = async (req: Request, res: Response) => {
  const data = req.body
  const result = await AcademicDepartmentService.createAcademicDepartment(data)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department created successfully!',
    data: result,
  })
}
const getAllAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, academicDepartmentFilterableFields)
    const paginationOptions = pick(req.query, paginationFields)
    const result = await AcademicDepartmentService.getAllAcademicDepartment(
      filters,
      paginationOptions,
    )

    sendResponse<IAcademicDepartment[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department fetched successfully!',
      meta: result.meta,
      data: result.data,
    })
  },
)
const getSingleAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const result =
      await AcademicDepartmentService.getSingleAcademicDepartment(id)

    sendResponse<IAcademicDepartment[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department fetched successfully!',
      data: result,
    })
  },
)

const updateAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const updatedData = req.body
    const result = await AcademicDepartmentService.updateAcademicDepartment(
      id,
      updatedData,
    )

    sendResponse<IAcademicDepartment[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department updated successfully!',
      data: result,
    })
  },
)

const deleteAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const result = await AcademicDepartmentService.deleteAcademicDepartment(id)

    sendResponse<IAcademicDepartment[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department deleted successfully!',
      data: result,
    })
  },
)

export const AcademicDepartmentController = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
  deleteAcademicDepartment,
}
