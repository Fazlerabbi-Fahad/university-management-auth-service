import { Request, Response } from 'express'
import { UserService } from './user.service'
import catchAsync from '../../share/catchAsync'
import sendResponse from '../../share/sendResponse'
import httpStatus from 'http-status'
import pick from '../../share/pick'
import { paginationFields } from '../../constants/pagination'
import { IUser } from './user.interface'
import { userFilterableFields } from './user.constant'

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { ...user } = req.body
  const result = await UserService.createUser(user)
  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully',
    data: result,
  })
})

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)
  const result = await UserService.getAllUser(filters, paginationOptions)

  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User fetched successfully!',
    meta: result.meta,
    data: result.data,
  })
})
const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await UserService.getSingleUser(id)

  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User fetched successfully!',
    data: result,
  })
})

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updatedData = req.body
  const result = await UserService.updateUser(id, updatedData)

  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully!',
    data: result,
  })
})

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await UserService.deleteUser(id)

  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully!',
    data: result,
  })
})

export const UserController = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
}
