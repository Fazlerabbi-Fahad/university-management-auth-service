import { NextFunction, Request, Response } from 'express'
import Config from '../Config'
import handleValidationError from '../errors/handleValidationError'
import { IGenericErrorMessage } from '../interface/ErrorMessage'
import ApiError from '../errors/ApiError'

const globalErrorHandler = async (
  err,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500
  let message = 'Something went wrong!'
  let errorMessages: IGenericErrorMessage[] = []

  if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err)

    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (err instanceof ApiError) {
    statusCode = err?.statusCode
    message = err?.message
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : []
  } else if (err instanceof Error) {
    message = err?.message
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : []
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: Config.env !== 'production' ? err?.stack : undefined,
  })
  next()
}

export default globalErrorHandler
