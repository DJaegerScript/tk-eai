import { initPuppeteer } from '../commons'
import { loadLimitation, loadUrl } from '../../config'
import config from '../../config/config.json'
import { handleInfiniteScroll } from './handleInfiniteScroll.function'
import { save } from './save.function'

const scrapeLinkedIn = async () => {
  try {
    console.log('Scraping LinkedIn...')
    const startTime = Date.now()

    const professions = config['professions']
    const limitation = loadLimitation('linkedin')
    if (!limitation) {
      throw Error("Limitation isn't configured")
    }

    let scrappedJobs = 0
    let savedJobs = 0
    for (const profession of professions) {
      console.log(`Scrapping ${profession} job in LinkedIn...`)
      const url = loadUrl(profession, limitation, 'linkedin')
      if (!url) {
        throw Error("Site isn't supported")
      }

      const { page, browser } = await initPuppeteer(url)

      await page.waitForSelector('.jobs-search__results-list')

      await handleInfiniteScroll(page)

      const searchResult = await page.$('.jobs-search__results-list')

      if (!searchResult) {
        throw new Error('Search result element not found')
      }

      const jobTabs = await searchResult.$$('li')

      console.log(`${jobTabs.length} ${profession} jobs have been scrapped!`)
      scrappedJobs += jobTabs.length

      const savedJob = await save(jobTabs)
      savedJobs += savedJob

      await browser.close()
    }

    console.log(
      `${savedJobs}/${scrappedJobs} scrapped jobs on LinkedIn were successfully saved with the execution time of ${(Date.now() - startTime) / 60000} minutes`
    )
  } catch (e) {
    console.log(e)
  }
}

export default scrapeLinkedIn
