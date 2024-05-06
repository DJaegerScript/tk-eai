import { Express } from 'express'
import { getAllJobs } from './job.handler'

export const initHandler = (app: Express) => {
  app.get('/', getAllJobs)
}
