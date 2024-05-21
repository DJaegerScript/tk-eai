import puppeteer, { Browser } from 'puppeteer-core'
import { loadUserAgent } from './loadUserAgent'

export const initPuppeteer = async () => {
  let browser: Browser
  if ((process.env.ENVIRONMENT || 'local') === 'local') {
    browser = await puppeteer.launch({
      headless: true,
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

  return {
    page,
    browser,
  }
}
