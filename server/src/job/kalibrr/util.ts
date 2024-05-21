import { ElementHandle } from 'puppeteer-core'
import { Job, Company, Location } from '../../database/models'
import { sub } from 'date-fns'

export const loadKalibrrUrl = (baseUrl: string, profession?: string) =>
  `${baseUrl}/${profession}`

export const convertDate = (rawDate?: string) => {
  const now = new Date(Date.now())
  if (!rawDate) {
    return now
  }

  const PREFIX = 'Recruiter was hiring'
  if (rawDate.startsWith(PREFIX)) {
    const actualDate = rawDate.replace(PREFIX, '')
    const [duration, unit, _] = actualDate.split(' ')

    return sub(now, {
      ...(unit.includes('year') && { years: parseInt(duration) }),
      ...(unit.includes('month') && { months: parseInt(duration) }),
      ...(unit.includes('day') && { days: parseInt(duration) }),
      ...(unit.includes('hour') && { hours: parseInt(duration) }),
      ...(unit.includes('minute') && { minutes: parseInt(duration) }),
      ...(unit.includes('second') && { seconds: parseInt(duration) }),
    })
  }
  return new Date(rawDate)
}

export const save = async (
  profession: string,
  scrapedJobs: ElementHandle<HTMLDivElement>[],
  limitation: Date
) => {
  console.log('Saving the scrapped job...')
  let totalSaved = 0
  for (const job of scrapedJobs) {
    try {
      const rawUrl = await job.$eval('h2 > a', (element) =>
        element.getAttribute('href')
      )

      const url = `https://www.kalibrr.com${rawUrl}`
      const existingJobs = await Job.find({ url })
      if (existingJobs.length > 0) {
        continue
      }

      const title = await job.$eval('h2 > a', (element) =>
        element.textContent?.trim()
      )

      const rawDate = await job.$$eval('span > svg', (element) =>
        element[3].nextElementSibling?.textContent?.trim()
      )
      const date = convertDate(rawDate)
      if (limitation > date) {
        continue
      }

      const company = await job.$eval('span > a', (element) =>
        element.textContent?.trim()
      )

      const existingCompanies = await Company.find({ name: company })
      if (existingCompanies.length === 0) {
        const companyModel = new Company({ name: company })
        await companyModel.save()
      }

      const location = await job.$eval('span > svg', (element) =>
        element.nextElementSibling?.textContent?.trim()
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
        source: 'kalibrr.com',
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
