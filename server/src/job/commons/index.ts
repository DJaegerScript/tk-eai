import { loadUserAgent } from '../../config'
import puppeteer from 'puppeteer-core'

export const initPuppeteer = async (url: string) => {
  const browser = await puppeteer.connect({
    defaultViewport: null,
    browserWSEndpoint: process.env.BROWSER_WS_ENDPOINT,
  })

  const [page] = await browser.pages()

  const userAgent = loadUserAgent()

  await page.setUserAgent(userAgent)

  await page.goto(url, {
    waitUntil: 'domcontentloaded',
  })

  return {
    page,
    browser,
  }
}
