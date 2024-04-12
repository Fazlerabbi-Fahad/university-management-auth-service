import { IUser } from './user.interface'
import { User } from './user.model'
import { generatedUserId } from './user.utils'
import Config from '../../Config'
import ApiError from '../../errors/ApiError'

const createUser = async (user: IUser): Promise<IUser | null> => {
  //auto generated incremental id
  const id = await generatedUserId()

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

export const userService = {
  createUser,
}
