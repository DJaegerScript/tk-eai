import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import initSchedule from './job'
import { initDatabase } from './database'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000

const createServer = async () => {
  await initDatabase()

  app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server')
  })

  initSchedule()

  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`)
  })
}

createServer()
