import { Company, Job, Location } from '../../database/models'
import { KarirOpportunityInterface } from './interface'

export const loadKarirUrl = (baseUrl: string, _profession?: string) =>
  `${baseUrl}/v2/search/opportunities`

export const save = async (
  opportunities: KarirOpportunityInterface[],
  limitation: Date,
  profession: string
) => {
  let savedJobs = 0
  for (const opportunity of opportunities) {
    const date = opportunity.posted_at
    if (limitation > date) {
      continue
    }

    const url = `https://karir.com/opportunities/${opportunity.id}`
    const existingJobs = await Job.find({ url })
    if (existingJobs.length > 0) {
      continue
    }

    const company = opportunity.company_name
    const existingCompanies = await Company.find({ name: company })
    if (existingCompanies.length === 0) {
      const companyModel = new Company({ name: company })
      await companyModel.save()
    }

    const location = opportunity.description
    const existingLocations = await Location.find({ name: location })
    if (existingLocations.length === 0) {
      const locationModel = new Location({ name: location })
      await locationModel.save()
    }

    const jobModel = new Job({
      title: opportunity.job_position,
      profession,
      date,
      location,
      company,
      source: 'karir.com',
      url,
    })

    await jobModel.save()
    savedJobs++
  }

  return savedJobs
}
