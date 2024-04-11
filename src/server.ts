import mongoose from 'mongoose'
import app from './app'
import Config from './Config'

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
}

bootstrap()
