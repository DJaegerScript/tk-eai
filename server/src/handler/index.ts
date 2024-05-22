import { Express } from 'express'
import { getAllJobs, getCompanies, getLocations } from './job.handler'
import cors from 'cors'

export const initHandler = (app: Express) => {
  app.use(
    cors({ origin: ['http://localhost:3000, https://tk-eai.vercel.app'] })
  )

  app.get('/', getAllJobs)
  app.get('/companies', getCompanies)
  app.get('/locations', getLocations)
}
