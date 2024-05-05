import puppeteer from 'puppeteer'
import { loadUserAgent } from '../../config'

export const initPuppeteer = async (url: string) => {
  const browser = await puppeteer.launch({
    defaultViewport: null,
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
