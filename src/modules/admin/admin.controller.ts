import { Request, RequestHandler, Response } from 'express'
import catchAsync from '../../share/catchAsync'
import sendResponse from '../../share/sendResponse'
import httpStatus from 'http-status'
import pick from '../../share/pick'
import { paginationFields } from '../../constants/pagination'
import { adminFilterableFields } from './admin.constant'
import { IAdmin } from './admin.interface'
import { AdminService } from './admin.server'

const getAllAdmin = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, adminFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)
  const result = await AdminService.getAllAdmin(filters, paginationOptions)

  sendResponse<IAdmin[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin fetched successfully!',
    meta: result.meta,
    data: result.data,
  })
})
const getSingleAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const result = await AdminService.getSingleAdmin(id)

    sendResponse<IAdmin>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin fetched successfully!',
      data: result,
    })
  },
)

const updateAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const updatedData = req.body

    const result = await AdminService.updateAdmin(id, updatedData)

    sendResponse<IAdmin>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin updated successfully!',
      data: result,
    })
  },
)

const deleteAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const result = await AdminService.deleteAdmin(id)

    sendResponse<IAdmin>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin deleted successfully!',
      data: result,
    })
  },
)

export const AdminController = {
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
}
