import job from 'node-cron'
import scrapeLinkedIn from './linkedin'
import config from '../config/config.json'
const initSchedule = () => {
  const schedule = job.schedule(config.schedule, async () => {
    await scrapeLinkedIn()
  })

  schedule.start()
}

export default initSchedule
