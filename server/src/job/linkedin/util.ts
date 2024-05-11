import { ElementHandle } from 'puppeteer-core'
import { Job, Company, Location } from '../../database/models'
import { differenceInMilliseconds, differenceInMonths } from 'date-fns'

export const loadLinkedinUrl = (baseUrl: string, profession: string) =>
  `${baseUrl}?keywords=${profession}`

export const save = async (
  profession: string,
  scrapedJobs: ElementHandle<HTMLLIElement>[],
  limitation: Date
) => {
  console.log('Saving the scrapped job...')
  let totalSaved = 0
  for (const job of scrapedJobs) {
    try {
      const rawUrl = await job.$eval('a', (element) =>
        element.getAttribute('href')
      )

      const url = rawUrl?.split('?')[0]
      const existingJobs = await Job.find({ url })
      if (existingJobs.length > 0) {
        continue
      }

      const title = await job.$eval('.base-search-card__title', (element) =>
        element.textContent?.trim()
      )

      const company = await job.$eval('.hidden-nested-link', (element) =>
        element.textContent?.trim()
      )
      const date = await job.$eval('time', (element) =>
        element.getAttribute('datetime')
      )
      if (limitation > new Date(date!)) {
        continue
      }

      const existingCompanies = await Company.find({ name: company })
      if (existingCompanies.length === 0) {
        const companyModel = new Company({ name: company })
        await companyModel.save()
      }

      const location = await job.$eval(
        '.job-search-card__location',
        (element) => element.textContent?.trim()
      )
      const existingLocations = await Location.find({ name: location })
      if (existingLocations.length === 0) {
        const locationModel = new Location({ name: location })
        await locationModel.save()
      }

      const jobModel = new Job({
        title,
        profession,
        date,
        location,
        company,
        source: 'linkedin.com',
        url,
      })

      await jobModel.save()
      totalSaved++
    } catch (e) {
      console.log(e)
    }
  }
  return totalSaved
}
