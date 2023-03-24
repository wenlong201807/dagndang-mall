class StringUtil {
  static isNotEmpty(str: string) {
    return str !== null && str.length > 0
  }
  static toNumber(str: string) {
    return Number(str) ? Number(str) : 0
  }
}

export const { isNotEmpty, toNumber } = StringUtil
