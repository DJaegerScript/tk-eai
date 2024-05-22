import { KarirResponseInterface } from './interface'
import { save } from './util'
import { Site } from '../interface'
import { Page } from 'puppeteer-core'

const scrapeKarir = async (
  url: string,
  profession: string,
  limitation: Date,
  _site?: Site,
  _page?: Page
) => {
  let offset = 0
  let scrappedJobs = 0
  let savedJobs = 0
  while (true) {
    const bodyPayload = {
      keyword: profession,
      location_ids: [],
      company_ids: [],
      industry_ids: [],
      job_function_ids: [],
      degree_ids: [],
      locale: 'id',
      limit: 100,
      offset,
      level: '',
      min_employee: 0,
      max_employee: 50,
      is_opportunity: true,
      sort_order: '',
      is_recomendation: false,
      is_preference: false,
      is_choice_opportunity: false,
      is_subscribe: false,
      workplace: null,
    }

    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(bodyPayload),
    })

    if (response.ok) {
      const {
        data: { total_opportunities, opportunities },
      }: KarirResponseInterface = await response.json()

      scrappedJobs += total_opportunities

      if (!!opportunities) {
        savedJobs += await save(opportunities, limitation, profession)
        if (total_opportunities === opportunities.length) {
          break
        }
      } else {
        break
      }
      offset += 100
    }
  }

  return {
    scrappedJobs,
    savedJobs,
  }
}

export default scrapeKarir
