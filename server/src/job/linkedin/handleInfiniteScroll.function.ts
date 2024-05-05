import { Page } from 'puppeteer-core'
import {
  ACTIVE_INFINITE_SCROLL_BUTTON,
  DOCUMENT_SCROLL_HEIGHT,
} from './constant'

export const handleInfiniteScroll = async (page: Page) => {
  console.log('Scrolling the page...')
  let initialHeight = 0
  while (true) {
    while (!(await page.$(ACTIVE_INFINITE_SCROLL_BUTTON))) {
      await page.evaluate(`window.scrollTo(0, ${DOCUMENT_SCROLL_HEIGHT})`)

      await new Promise((resolve) => setTimeout(resolve, 1500))

      await page.evaluate('window.scrollTo(0, 0)')

      await new Promise((resolve) => setTimeout(resolve, 1500))
    }

    const loadMoreButton = await page.$(ACTIVE_INFINITE_SCROLL_BUTTON)
    await loadMoreButton?.click()
    await new Promise((resolve) => setTimeout(resolve, 2500))

    const currentHeight = await page.evaluate(DOCUMENT_SCROLL_HEIGHT)
    if (currentHeight === initialHeight) {
      break
    }
    initialHeight = currentHeight as number
  }
}
