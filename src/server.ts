import mongoose from 'mongoose'
import app from './app'
import Config from './Config'
import { errorLogger, logger } from './share/logger'
import { Server } from 'http'

process.on('uncaughtException', error => {
  errorLogger.error(error)
  process.exit(1)
})
let server: Server
async function bootstrap() {
  try {
    await mongoose.connect(Config.database_url as string)
    logger.info('Database is connected successfully')

    app.listen(Config.port, () => {
      logger.info(`Example app listening on port ${Config.port}`)
    })
  } catch {
    errorLogger.error('Failed to connect database', Config.port)
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorLogger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

bootstrap()

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received')
  if (server) {
    server.close()
  }
})
