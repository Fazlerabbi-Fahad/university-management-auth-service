/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose'
import { IStudent } from '../student/student.interface'
import { IFaculty } from '../faculty/faculty.interface'
import { IAdmin } from '../admin/admin.interface'

export type IUser = {
  id: string
  role: string
  password: string
  needsPasswordChange?: true | false
  passwordChangedAt?: Date
  student?: Types.ObjectId | IStudent | undefined
  faculty?: Types.ObjectId | IFaculty
  admin?: Types.ObjectId | IAdmin
}

export type IUserMethods = {
  isUserExist(id: string): Promise<Partial<IUser> | null>
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>
}

export type UserModel = Model<IUser> & IUserMethods
