import express, { Application, Request, Response } from 'express'
import cors from 'cors'
const app: Application = express()

app.use(cors())

//parsing
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: anu) => {
  res.send('Hello World!')
})

export default app
