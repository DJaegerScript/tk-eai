import scrapeLinkedIn from './linkedin'
import { loadLinkedinUrl } from './linkedin/util'

export const BASE_URLS: { [key: string]: string } = {
  linkedin: 'https://www.linkedin.com/jobs/search',
  kalibrr: 'https://www.kalibrr.com/home/te',
}

export const INFINITE_SCROLL_BUTTON: { [key: string]: string } = {
  linkedin: '.infinite-scroller__show-more-button--visible',
  kalibrr:
    'div.k-font-dm-sans.k-rounded-lg.k-bg-white.k-border-solid.k-border.hover:k-border-2.hover:k-border-primary-color.k-border.k-group.k-flex.k-flex-col.k-justify-between.css-1otdiuc',
}

export const DOCUMENT_SCROLL_HEIGHT = 'document.body.scrollHeight'

export const SITES = [
  {
    site: {
      label: 'LinkedIn',
      value: 'linkedin',
    },
    loadUrlCallback: loadLinkedinUrl,
    scrapeCallback: scrapeLinkedIn,
  },
]
