export const toNumber = (val: any): any => {
  const n = parseFloat(val)
  return isNaN(n) ? val : n
}

export const trimStr = (str: string): string => {
  if (str.length > 20) {
    return str.substring(0, 20) + '...'
  }
  return str
}
