import { Request, Response } from 'express'
import Job from '../database/models/job'
import { LIMIT } from './constant'

export const getAllJobs = async (req: Request, res: Response) => {
  const page = parseInt((req.query.page as string) || '1')
  const title = req.query.title
  const profession = req.query.profession
  const date = req.query.date
    ? new Date(req.query.date as string).getDate()
    : null
  const location = req.query.location
  const company = req.query.company

  const skip = (page - 1) * LIMIT

  const filter = {
    ...(title && { title }),
    ...(profession && { profession }),
    ...(date && { date }),
    ...(location && { location }),
    ...(company && { company }),
  }

  const jobs = await Job.find(filter, null, { skip, limit: LIMIT })
  const aggregation = await Job.aggregate().count('*')
  const totalJob = aggregation.length > 0 ? aggregation[0]['*'] : 0

  const totalPages = Math.ceil(totalJob / LIMIT)

  res.json({
    data: jobs,
    meta: {
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  })
}
