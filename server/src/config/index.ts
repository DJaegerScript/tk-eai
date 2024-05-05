import config from './config.json'
export const loadUserAgent = () => {
  const day = new Date().getDay()

  return config['user-agents'][day % 1]
}

export const loadLimitation = (site: string) => {
  const limitation = config['limitation']
  if (site === 'linkedin') {
    const [ duration, unit] = limitation.split(" ")
    if (unit.includes("month") ) {
      return parseInt(duration) * 30 * 24 * 36000 // month * days * hours * seconds
    }
  }

  return null
}

export const loadUrl = (profession: string, limitation: number, site: string) => {
  if (site === 'linkedin') {
    return `${config['base-urls']['linkedin']}?keywords=${profession}&f_TPR=r${limitation}`
  }

  console.error("Site isn't supported")
  return null
}