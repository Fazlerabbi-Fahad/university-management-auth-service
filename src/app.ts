import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { userRouter } from './modules/user/user.route'
import globalErrorHandler from './middlewares/globalErrorHandler'
const app: Application = express()

app.use(cors())

//parsing
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//application routes
app.use('/api/v1/users/', userRouter)

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  next(err)
})

//global err handler
app.use(globalErrorHandler)

export default app
