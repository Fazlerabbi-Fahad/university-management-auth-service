import mongoose from 'mongoose'
import app from './app'
import Config from './Config'
import { Server } from 'http'

process.on('uncaughtException', error => {
  console.error(error)
  process.exit(1)
})
let server: Server
async function bootstrap() {
  try {
    await mongoose.connect(Config.database_url as string)
    console.log('Database is connected successfully')

    app.listen(Config.port, () => {
      console.log(`Example app listening on port ${Config.port}`)
    })
  } catch {
    console.log('Failed to connect database', Config.port)
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        console.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

bootstrap()

process.on('SIGTERM', () => {
  console.log('SIGTERM is received')
  if (server) {
    server.close()
  }
})
