import { Site } from '../interface'
import { Page } from 'puppeteer-core'
import { save } from './util'
import { handleInfiniteScroll, handleLoadButton } from '../commons'

const scrapeLinkedIn = async (
  url: string,
  profession: string,
  limitation: Date,
  site?: Site,
  page?: Page
) => {
  if (!!site && !!page) {
    await page.goto(url, {
      waitUntil: 'domcontentloaded',
    })

    await page.waitForSelector('.jobs-search__results-list')

    await handleInfiniteScroll(page, site.value)

    await handleLoadButton(page, site.value)

    const searchResult = await page.$('.jobs-search__results-list')

    if (!searchResult) {
      throw new Error('Search result element not found')
    }

    const jobs = await searchResult.$$('li')

    console.log(`${jobs.length} ${profession} jobs have been scrapped!`)

    const savedJobs = await save(profession, jobs, limitation)

    return {
      scrappedJobs: jobs.length,
      savedJobs,
    }
  }

  return {
    scrappedJobs: 0,
    savedJobs: 0,
  }
}

export default scrapeLinkedIn
