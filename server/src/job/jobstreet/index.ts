import { Site } from '../interface'
import { Page } from 'puppeteer-core'
import { Company, Job, Location } from '../../database/models'
import { convertDate } from './util'

const scrapeJobstreet = async (
  url: string,
  profession: string,
  limitation: Date,
  site?: Site,
  page?: Page
) => {
  if (!!site && !!page) {
    let currentPage = 1
    let savedJobs = 0
    let scrappedJobs = 0
    while (true) {
      console.log(`Scraping page ${currentPage}`)
      await page.goto(`${url}?page=${currentPage}`, {
        waitUntil: 'domcontentloaded',
      })

      if (
        (
          await page.$('section[data-automation=searchZeroResults]')
        )?.isVisible()
      ) {
        break
      }

      await page.waitForSelector('article[data-automation=normalJob]')

      const jobs = await page.$$('article[data-automation=normalJob]')
      scrappedJobs += jobs.length
      for (const job of jobs) {
        try {
          const rawUrl = await job.$eval(
            'a[data-automation="jobTitle"]',
            (element) => element.href
          )

          const jobUrl = `https://www.jobstreet.co.id${rawUrl}`
          const existingJobs = await Job.find({ url: jobUrl })
          if (existingJobs.length > 0) {
            continue
          }

          const title = await job.$eval(
            'a[data-automation="jobTitle"]',
            (element) => element.textContent?.trim()
          )
          const company = await job.$eval(
            'a[data-automation="jobCompany"]',
            (element) => element.textContent?.trim()
          )
          const existingCompanies = await Company.find({ name: company })
          if (existingCompanies.length === 0) {
            const companyModel = new Company({ name: company })
            await companyModel.save()
          }

          const location = await job.$eval(
            'a[data-automation="jobLocation"]',
            (element) => element.textContent?.trim()
          )
          const existingLocations = await Location.find({ name: location })
          if (existingLocations.length === 0) {
            const locationModel = new Location({ name: location })
            await locationModel.save()
          }

          const rawDate = await job.$eval(
            'span[data-automation="jobListingDate"]',
            (element) => element.textContent?.trim()
          )

          const date = convertDate(rawDate)

          const jobModel = new Job({
            title,
            profession,
            date,
            location,
            company,
            source: 'jobstreet.co.id',
            url: `https://www.jobstreet.co.id${jobUrl}`,
          })

          await jobModel.save()

          savedJobs++
          await new Promise((resolve) => setTimeout(resolve, 5000))
        } catch (e) {
          console.log(e)
        }
      }
      currentPage++
    }
    console.log(`${scrappedJobs} ${profession} jobs have been scrapped!`)

    return {
      scrappedJobs,
      savedJobs,
    }
  }

  return {
    scrappedJobs: 0,
    savedJobs: 0,
  }
}

export default scrapeJobstreet
