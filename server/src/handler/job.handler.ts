import { Request, Response } from 'express'
import { LIMIT } from './constant'
import { Company, Job, Location } from '../database/models'

export const getAllJobs = async (req: Request, res: Response) => {
  const page = parseInt((req.query.page as string) || '1')
  const title = req.query.title
  const profession = req.query.profession
  const date = req.query.date ? new Date(req.query.date as string) : null
  const location = req.query.location
  const company = req.query.company

  const skip = (page - 1) * LIMIT

  const filter = {
    ...(title && { title: new RegExp(`/${title}/`.slice(1, -1)) }),
    ...(profession && {
      profession: new RegExp('^' + (profession as string).toLowerCase(), 'i'),
    }),
    ...(date && { date }),
    ...(location && { location }),
    ...(company && { company }),
  }

  const jobs = await Job.find(filter, null, { skip, limit: LIMIT })
  const total = await Job.find(filter).countDocuments()

  const totalPages = Math.ceil(total / LIMIT)

  res.json({
    data: jobs,
    meta: {
      hasNext: page < totalPages,
      hasPrev: page > 1,
      total,
      totalPages,
    },
  })
}

export const getLocations = async (req: Request, res: Response) => {
  const locations = await Location.find()

  res.json({
    locations: locations.map(({ id, name }) => ({ id, name })),
  })
}

export const getCompanies = async (req: Request, res: Response) => {
  const companies = await Company.find()

  res.json({
    companies: companies.map(({ id, name }) => ({ id, name })),
  })
}
