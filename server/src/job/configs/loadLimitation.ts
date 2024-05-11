import { sub } from 'date-fns'

export const loadLimitation = () => {
  const limitation = process.env.LIMITATION
  if (!limitation) {
    throw Error('Undefined limitation')
  }
  const now = new Date(Date.now())

  const [duration, unit] = limitation.split(' ')

  return sub(now, {
    ...(unit.includes('year') && { years: parseInt(duration) }),
    ...(unit.includes('month') && { months: parseInt(duration) }),
    ...(unit.includes('day') && { days: parseInt(duration) }),
    ...(unit.includes('hour') && { hours: parseInt(duration) }),
  })
}
