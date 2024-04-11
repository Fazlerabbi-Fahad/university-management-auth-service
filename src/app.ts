import express, { Application, Request, Response } from 'express'
import cors from 'cors'
const app: Application = express()

pp.use(cors())

//parsing
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

export default app
