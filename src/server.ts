import mongoose from 'mongoose'
import app from './app'
import Config from './Config'
import { errorLogger, logger } from './share/logger'

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
}

bootstrap()
