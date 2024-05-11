import { Site } from '../interface'
import { Page } from 'puppeteer-core'
import { handleLoadButton } from '../commons'
import { save } from './util'

const scrapeKalibrr = async (
  site: Site,
  page: Page,
  profession: string,
  limitation: Date
) => {
  await page.waitForSelector('div.css-1otdiuc')

  await handleLoadButton(page, site.value)

  const jobs = await page.$$('div.css-1otdiuc')
  console.log(`${jobs.length} ${profession} jobs have been scrapped!`)

  const savedJobs = await save(profession, jobs, limitation)

  return {
    scrappedJobs: jobs.length,
    savedJobs,
  }
}

export default scrapeKalibrr
