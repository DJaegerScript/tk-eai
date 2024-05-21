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

      SITES.map(async ({ site, loadUrlCallback, scrapeCallback, type }) =>
        type === 'web'
          ? await scrapeWeb(site, loadUrlCallback, scrapeCallback, limitation)
          : await scrapeApi(site, loadUrlCallback, scrapeCallback, limitation)
      )
    })

    schedule.start()
  } catch (e) {
    console.error(e)
  }
}

const scrapeApi = async (
  site: Site,
  loadUrlCallback: LoadUrlCallback,
  scrapeCallback: ScrapeCallback,
  limitation: Date
) => {
  console.log(`Scraping ${site.label}...`)
  const startTime = Date.now()

  const professions = loadProfession()

  let scrappedJobs = 0
  let savedJobs = 0
  for (const profession of professions) {
    console.log(`Scrapping ${profession} job in ${site.label}...`)
    const url = loadUrlCallback(BASE_URLS[site.value as string])

    try {
      const result = await scrapeCallback(url, profession, limitation)
      scrappedJobs += result.scrappedJobs
      savedJobs += result.savedJobs
    } catch (e) {
      console.error(e)
    }
  }

  console.log(
    `${savedJobs}/${scrappedJobs} scrapped jobs on ${site.label} were successfully saved with the execution time of ${(Date.now() - startTime) / 60000} minutes`
  )
}

const scrapeWeb = async (
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

      const { page, browser } = await initPuppeteer()

      try {
        const result = await scrapeCallback(
          url,
          profession,
          limitation,
          site,
          page
        )
        scrappedJobs += result.scrappedJobs
        savedJobs += result.savedJobs
      } catch (e) {
        console.error(e)
      } finally {
        await browser.close()
      }
    }

    console.log(
      `${savedJobs}/${scrappedJobs} scrapped jobs on ${site.label} were successfully saved with the execution time of ${(Date.now() - startTime) / 60000} minutes`
    )
  } catch (e) {
    console.error(e)
  }
}

export default initSchedule
