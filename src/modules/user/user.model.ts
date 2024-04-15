import { Schema, model } from 'mongoose'
import { IUser, UserModel } from './user.interface'

const userSchema = new Schema<IUser, UserModel>(
  {
    id: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    password: { type: String, required: true },
    student: {
      types: Schema.Types.ObjectId,
      ref: 'Student',
    },
    faculty: {
      types: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
    admin: {
      types: Schema.Types.ObjectId,
      ref: 'Admin',
    },
  },
  {
    timestamps: true,
  },
)

export const User = model<IUser, UserModel>('User', userSchema)

export type IUserFilters = {
  searchTerm?: string
}
