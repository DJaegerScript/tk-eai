export const loadUserAgent = () => {
  const day = new Date().getDay()

  const userAgentConfig = process.env.USER_AGENTS
  if (!userAgentConfig) {
    throw Error('Undefined user agents')
  }

  const userAgents = userAgentConfig.split('$$')

  return userAgents[day % 1]
}
