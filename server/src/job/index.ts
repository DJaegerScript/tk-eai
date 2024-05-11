import job from 'node-cron'
import { LoadUrlCallback, ScrapeCallback, Site } from './interface'
import { BASE_URLS, SITES } from './constant'
import { initPuppeteer, loadLimitation, loadProfession } from './configs'
const initSchedule = () => {
  try {
    const scheduleCron = process.env.SCHEDULE
    if (!scheduleCron) {
      throw new Error('Undefined schedule!')
    }

    const schedule = job.schedule(scheduleCron, async () => {
      const limitation = loadLimitation()

      SITES.map(
        async ({ site, loadUrlCallback, scrapeCallback }) =>
          await scrape(site, loadUrlCallback, scrapeCallback, limitation)
      )
    })

    schedule.start()
  } catch (e) {
    console.error(e)
  }
}

const scrape = async (
  site: Site,
  loadUrlCallback: LoadUrlCallback,
  scrapeCallback: ScrapeCallback,
  limitation: Date
) => {
  try {
    console.log(`Scraping ${site.label}...`)
    const startTime = Date.now()

    const professions = loadProfession()

    let scrappedJobs = 0
    let savedJobs = 0
    for (const profession of professions) {
      console.log(`Scrapping ${profession} job in ${site.label}...`)
      const url = loadUrlCallback(BASE_URLS[site.value as string], profession)

      const { page, browser } = await initPuppeteer(url)

      const result = await scrapeCallback(site, page, profession, limitation)
      scrappedJobs += result.scrappedJobs
      savedJobs += result.savedJobs

      await browser.close()
    }

    console.log(
      `${savedJobs}/${scrappedJobs} scrapped jobs on ${site.label} were successfully saved with the execution time of ${(Date.now() - startTime) / 60000} minutes`
    )
  } catch (e) {
    console.log(e)
  }
}

export default initSchedule
