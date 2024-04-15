import { Request, Response } from 'express'
import { AcademicFacultyService } from './academicFaculty.service'
import sendResponse from '../../share/sendResponse'
import httpStatus from 'http-status'
import pick from '../../share/pick'
import catchAsync from '../../share/catchAsync'
import { IAcademicFaculty } from './academicFaculty.interface'
import { paginationFields } from '../../constants/pagination'
import { academicFacultyFilterableFields } from './academicFaculty.constant'

const createAcademicFaculty = async (req: Request, res: Response) => {
  const data = req.body
  const result = await AcademicFacultyService.createAcademicFaculty(data)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty created successfully!',
    data: result,
  })
}
const getAllAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, academicFacultyFilterableFields)
    const paginationOptions = pick(req.query, paginationFields)
    const result = await AcademicFacultyService.getAllAcademicFaculty(
      filters,
      paginationOptions,
    )

    sendResponse<IAcademicFaculty[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic faculty fetched successfully!',
      meta: result.meta,
      data: result.data,
    })
  },
)
const getSingleAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const result = await AcademicFacultyService.getSingleAcademicFaculty(id)

    sendResponse<IAcademicFaculty[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic faculty fetched successfully!',
      data: result,
    })
  },
)

const updateAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const updatedData = req.body
    const result = await AcademicFacultyService.updateAcademicFaculty(
      id,
      updatedData,
    )

    sendResponse<IAcademicFaculty[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic faculty updated successfully!',
      data: result,
    })
  },
)

const deleteAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const result = await AcademicFacultyService.deleteAcademicFaculty(id)

    sendResponse<IAcademicFaculty[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic faculty deleted successfully!',
      data: result,
    })
  },
)

export const AcademicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
  deleteAcademicFaculty,
}
