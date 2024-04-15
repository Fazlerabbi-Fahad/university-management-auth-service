import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import globalErrorHandler from './middlewares/globalErrorHandler'

import httpStatus from 'http-status'
import router from './route'
const app: Application = express()

app.use(cors())

//parsing
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//application routes
app.use('/api/v1/', router)

//testing
app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  throw new Error('Testing Error Logger')
})

//global err handler
app.use(globalErrorHandler)
//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessage: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  })
  next()
})

export default app
