import { Express } from 'express'
import { getAllJobs, getCompanies, getLocations } from './job.handler'

export const initHandler = (app: Express) => {
  app.get('/', getAllJobs)
  app.get('/companies', getCompanies)
  app.get('/locations', getLocations)
}
