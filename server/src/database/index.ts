import mongoose from 'mongoose'

export const initDatabase = async () => {
  await mongoose.connect(
    process.env.DB_URL || 'mongodb://admin:password@localhost:27017/'
  )
}
