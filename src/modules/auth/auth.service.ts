import httpStatus from 'http-status'
import ApiError from '../../errors/ApiError'
import { User } from '../user/user.model'
import {
  IChangePassword,
  ILoginUser,
  ILoginUserResponse,
} from './auth.interface'
import { JwtPayload, Secret } from 'jsonwebtoken'
import Config from '../../Config'
import { jwtHelpers } from '../../helpers/jwtHelpers'
import bcrypt from 'bcrypt'

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload

  const isUserExist = await User.isUserExist(id)

  //check user exist
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }

  //Match password
  if (
    isUserExist.password &&
    !User.isPasswordMatched(password, isUserExist?.password)
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect')
  }

  //create jwt
  const { id: userId, role, needsPasswordChange } = isUserExist
  const accessToken = jwtHelpers.createToken(
    { userId, role },
    Config.jwt.secret as Secret,
    Config.jwt.expires_in as string,
  )

  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    Config.jwt.refresh_secret as Secret,
    Config.jwt.refresh_expires_in as string,
  )

  return { accessToken, refreshToken, needsPasswordChange }
}

const refreshToken = async (token: string): Promise<string> => {
  let verifiedToken = null
  try {
    verifiedToken = jwtHelpers.verifiedToken(
      token,
      Config.jwt.refresh_secret as Secret,
    )
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token')
  }

  const { userId } = verifiedToken

  const isUserExist = await User.isUserExist(userId)

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }

  // Generate new token
  const newAccessToken = jwtHelpers.createToken(
    {
      id: isUserExist.id,
      role: isUserExist.role,
    },
    Config.jwt.secret as Secret,
    Config.jwt.expires_in as string,
  )

  return newAccessToken
}

const createPassword = async (
  user: JwtPayload,
  payload: IChangePassword,
): Promise<void> => {
  const { oldPassword, newPassword } = payload
  const isUserExist = await User.isUserExist(user?.userId)

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }

  // Checking old password
  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(oldPassword, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Old password is incorrect')
  }

  // Hash new password before saving
  const newHashedPassword = await bcrypt.hash(
    newPassword,
    Number(Config.bycrypt_salt_rounds),
  )

  const updatedData = {
    password: newHashedPassword,
    needsPasswordChanged: false,
    passwordChangedAt: new Date(),
  }

  // Update password
  await User.findByIdAndUpdate(user.id, updatedData)
}
export const AuthService = {
  loginUser,
  refreshToken,
  createPassword,
}
