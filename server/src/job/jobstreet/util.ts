import { sub } from 'date-fns'

export const loadJobStreetUrl = (baseUrl: string, profession?: string) =>
  `${baseUrl}/${profession}-jobs`

export const convertDate = (rawDate?: string) => {
  if (!!rawDate) {
    const dayCount = rawDate?.split(' ')[0]
    if (!!dayCount) {
      if (dayCount?.includes('+')) {
        dayCount?.replace('+', '')
      }
      return sub(new Date(Date.now()), { days: parseInt(dayCount) })
    }
  }

  return new Date(Date.now())
}
