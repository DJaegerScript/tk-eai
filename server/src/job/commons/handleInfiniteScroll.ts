import { Page } from 'puppeteer-core'
import { DOCUMENT_SCROLL_HEIGHT, INFINITE_SCROLL_BUTTON } from '../constant'

export const handleInfiniteScroll = async (page: Page, site: string) => {
  console.log('Scrolling the page...')
  while (!(await page.$(INFINITE_SCROLL_BUTTON[site]))) {
    await page.evaluate(`window.scrollTo(0, ${DOCUMENT_SCROLL_HEIGHT})`)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    await page.evaluate('window.scrollTo(0, 0)')

    await new Promise((resolve) => setTimeout(resolve, 1500))
  }
}
