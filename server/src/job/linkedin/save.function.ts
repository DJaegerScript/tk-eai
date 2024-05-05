import { ElementHandle } from 'puppeteer-core'
import Job from '../../database/models/job'

export const save = async (scrapedJobs: ElementHandle<HTMLLIElement>[]) => {
  console.log('Saving the scrapped job...')
  let totalSaved = 0
  for (const job of scrapedJobs) {
    try {
      const rawUrl = await job.$eval('a', (element) =>
        element.getAttribute('href')
      )

      const url = rawUrl?.split('?')[0]

      const existingJobs = await Job.find({ url: url })
      if (existingJobs.length > 0) {
        continue
      }

      const title = await job.$eval('.base-search-card__title', (element) =>
        element.textContent?.trim()
      )
      const company = await job.$eval('.hidden-nested-link', (element) =>
        element.textContent?.trim()
      )
      const location = await job.$eval(
        '.job-search-card__location',
        (element) => element.textContent?.trim()
      )
      const date = await job.$eval('time', (element) =>
        element.getAttribute('datetime')
      )

      const jobModel = new Job({
        title,
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
