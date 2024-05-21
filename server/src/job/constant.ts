import scrapeLinkedIn from './linkedin'
import { loadLinkedinUrl } from './linkedin/util'
import scrapeKalibrr from './kalibrr'
import { loadKalibrrUrl } from './kalibrr/util'
import { loadJobStreetUrl } from './jobstreet/util'
import scrapeJobstreet from './jobstreet'
import { loadKarirUrl } from './karir/util'
import scrapeKarir from './karir'

export const BASE_URLS: { [key: string]: string } = {
  linkedin: 'https://www.linkedin.com/jobs/search',
  kalibrr: 'https://www.kalibrr.com/home/te',
  jobstreet: 'https://www.jobstreet.co.id/id',
  karir: 'https://gateway2-beta.karir.com',
}

export const INFINITE_SCROLL_BUTTON: { [key: string]: string } = {
  linkedin: '.infinite-scroller__show-more-button--visible',
  kalibrr: '.k-font-dm-sans.k-w-full.k-flex.k-justify-center.k-mb-10 button',
}

export const DOCUMENT_SCROLL_HEIGHT = 'document.body.scrollHeight'

export const SITES = [
  {
    site: {
      label: 'Karir',
      value: 'karir',
    },
    type: 'api',
    loadUrlCallback: loadKarirUrl,
    scrapeCallback: scrapeKarir,
  },
  {
    site: {
      label: 'LinkedIn',
      value: 'linkedin',
    },
    type: 'web',
    loadUrlCallback: loadLinkedinUrl,
    scrapeCallback: scrapeLinkedIn,
  },
  {
    site: {
      label: 'Kalibrr',
      value: 'kalibrr',
    },
    type: 'web',
    loadUrlCallback: loadKalibrrUrl,
    scrapeCallback: scrapeKalibrr,
  },
  {
    site: {
      label: 'JobStreet',
      value: 'jobstreet',
    },
    type: 'web',
    loadUrlCallback: loadJobStreetUrl,
    scrapeCallback: scrapeJobstreet,
  },
]
