import { Page } from 'puppeteer-core'
import { DOCUMENT_SCROLL_HEIGHT, INFINITE_SCROLL_BUTTON } from '../constant'

export const handleLoadButton = async (page: Page, site: string) => {
  console.log('Loading more page...')
  let initialHeight = 0
  while (true) {
    const loadMoreButton = await page.$(INFINITE_SCROLL_BUTTON[site])
    await loadMoreButton?.click()
    await new Promise((resolve) => setTimeout(resolve, 2500))

    const currentHeight = await page.evaluate(DOCUMENT_SCROLL_HEIGHT)
    if (currentHeight === initialHeight) {
      break
    }
    initialHeight = currentHeight as number
  }
}
