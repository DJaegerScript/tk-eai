import puppeteer, { Browser } from 'puppeteer-core'
import { loadUserAgent } from './loadUserAgent'

export const initPuppeteer = async (url: string) => {
  let browser: Browser
  if ((process.env.ENVIRONMENT || 'local') === 'local') {
    browser = await puppeteer.launch({
      headless: false,
      executablePath: process.env.LOCAL_BROWSER,
    })
  } else {
    browser = await puppeteer.connect({
      defaultViewport: null,
      browserWSEndpoint: process.env.REMOTE_BROWSER,
    })
  }

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
