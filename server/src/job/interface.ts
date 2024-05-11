import { Page } from 'puppeteer-core'

export interface Site {
  label: string
  value: string
}

export interface ScrapeCallbackReturn {
  scrappedJobs: number
  savedJobs: number
}

export type ScrapeCallback = (
  site: Site,
  page: Page,
  profession: string,
  limitation: Date
) => Promise<ScrapeCallbackReturn>

export type LoadUrlCallback = (baseUrl: string, profession: string) => string
