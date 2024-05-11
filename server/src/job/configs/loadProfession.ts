export const loadProfession = () => {
  const professionConfig = process.env.PROFESSIONS
  if (!professionConfig) {
    throw new Error('Undefined professions')
  }

  return professionConfig.split(',')
}
