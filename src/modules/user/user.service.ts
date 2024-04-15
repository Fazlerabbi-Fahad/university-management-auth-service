import { IUser } from './user.interface'
import { IUserFilters, User } from './user.model'
import { generatedStudentId } from './user.utils'
import Config from '../../Config'
import ApiError from '../../errors/ApiError'
import { IPaginationOptions } from '../../interface/pagination'
import { IGenericResponse } from '../../interface/common'
import { paginationHelpers } from '../../helpers/paginationHeloper'
import { userSearchableFields } from './user.constant'
import { SortOrder } from 'mongoose'

const createUser = async (user: IUser): Promise<IUser | null> => {
  //auto generated incremental id
  const academicSemester = {
    code: '01',
    year: '2022',
  }
  const id = await generatedStudentId(academicSemester)

  user.id = id

  //default password
  if (!user.password) {
    user.password = Config.default_user_pass as string
  }
  const result = await User.create(user)
  if (!result) {
    throw new ApiError(400, 'Failed to created user!')
  }
  return result
}

const getAllUser = async (
  filters: IUserFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IUser[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const { searchTerm, ...filtersData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: userSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }
  const sortConditions: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}

  const result = await User.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await User.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id)
  return result
}

const updateUser = async (
  id: string,
  payload: Partial<IUser>,
): Promise<IUser | null> => {
  const result = await User.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

const deleteUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id)
  return result
}

export const UserService = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
}
