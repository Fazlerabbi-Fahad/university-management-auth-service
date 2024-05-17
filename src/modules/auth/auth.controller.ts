import { Request, RequestHandler, Response } from 'express'
import catchAsync from '../../share/catchAsync'
import sendResponse from '../../share/sendResponse'
import httpStatus from 'http-status'
import { AuthService } from './auth.service'
import { ILoginUserResponse, IRefreshTokenResponse } from './auth.interface'
import Config from '../../Config'
import { JwtPayload } from 'jsonwebtoken'

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body
  const result = await AuthService.loginUser(loginData)
  const { refreshToken, ...others } = result

  //Set refresh token into cookie

  const cookieOptions = {
    secure: Config.env === 'production',
    httpOnly: true,
  }
  res.cookie('refreshToken', refreshToken, cookieOptions)

  // delete result.refreshToken

  if ('refreshToken' in result) {
    delete result.refreshToken
  }

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully!',
    data: others,
  })
})
const refreshToken: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies
    const newAccessToken = await AuthService.refreshToken(refreshToken)

    // Set the new refresh token into the cookie
    const cookieOptions = {
      secure: Config.env === 'production',
      httpOnly: true,
    }
    res.cookie('refreshToken', newAccessToken, cookieOptions)

    // Send response
    sendResponse<IRefreshTokenResponse>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User logged in successfully!',
      data: { accessToken: newAccessToken },
    })
  },
)

const changePassword: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user as JwtPayload

    const { ...passwordData } = req.body
    const result = await AuthService.createPassword(user, passwordData)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Password change in successfully!',
      data: result,
    })
  },
)

export const AuthController = {
  loginUser,
  refreshToken,
  changePassword,
}
