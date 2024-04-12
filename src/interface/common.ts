import { IGenericErrorMessage } from './ErrorMessage'

export type IGenericErrorResponse = {
  statusCode: number
  message: string
  errorMessages: IGenericErrorMessage[]
}
