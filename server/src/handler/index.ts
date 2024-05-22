import { Express } from 'express'
import { getAllJobs, getCompanies, getLocations } from './job.handler'

export const initHandler = (app: Express) => {
  app.use((req, res, next) => {
    const allowedOrigins = [
      'http://127.0.0.1:3000',
      'http://localhost:3000',
      'https://tk-eai.vercel.app',
    ]
    const origin = req.headers.origin
    if (allowedOrigins.includes(origin!)) {
      res.setHeader('Access-Control-Allow-Origin', origin!)
    }
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    res.header('Access-Control-Allow-Credentials', 'true')
    return next()
  })

  app.get('/', getAllJobs)
  app.get('/companies', getCompanies)
  app.get('/locations', getLocations)
}
