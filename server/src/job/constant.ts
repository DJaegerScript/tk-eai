import scrapeLinkedIn from './linkedin'
import { loadLinkedinUrl } from './linkedin/util'
import scrapeKalibrr from './kalibrr'
import { loadKalibrrUrl } from './kalibrr/util'

export const BASE_URLS: { [key: string]: string } = {
  linkedin: 'https://www.linkedin.com/jobs/search',
  kalibrr: 'https://www.kalibrr.com/home/te',
}

export const INFINITE_SCROLL_BUTTON: { [key: string]: string } = {
  linkedin: '.infinite-scroller__show-more-button--visible',
  kalibrr: '.k-font-dm-sans.k-w-full.k-flex.k-justify-center.k-mb-10 button',
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
  {
    site: {
      label: 'Kalibrr',
      value: 'kalibrr',
    },
    loadUrlCallback: loadKalibrrUrl,
    scrapeCallback: scrapeKalibrr,
  },
]
