import express, { Express } from 'express'
import dotenv from 'dotenv'
import initSchedule from './job'
import { initDatabase } from './database'
import { initHandler } from './handler'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000

const createServer = async () => {
  await initDatabase()

  initSchedule()

  initHandler(app)

  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`)
  })
}

createServer()
