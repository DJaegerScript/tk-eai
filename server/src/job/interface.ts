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
  url: string,
  profession: string,
  limitation: Date,
  site?: Site,
  page?: Page
) => Promise<ScrapeCallbackReturn>

export type LoadUrlCallback = (baseUrl: string, profession?: string) => string
