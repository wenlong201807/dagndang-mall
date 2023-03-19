// 获取数组中元素key的类型
export type ItemType<T extends object[]> = {
  [K in keyof EleOfArr<T>]: EleOfArr<T>[K]
}

//
export type EleOfArr<T> = T extends Array<infer E> ? E : never

// 获取指定key组成的数组
export function getSubItemFrmArr<T extends ItemType<T>[], K extends keyof EleOfArr<T>>(t: T, ...keys: K[]): Pick<EleOfArr<T>, K>[] {
  return t.map((item) => {
    return keys.reduce((pre, cur, index) => {
      return {
        ...pre,
        [keys[index]]: item[keys[index]],
      } // secondctgyid[secondctgyid[0]]
    }, {}) // {} 为初始值
  }) as Pick<EleOfArr<T>, K>[]
}

export function getOneitemValuesFrmArr<T extends ItemType<T>[], K extends keyof EleOfArr<T>, E = EleOfArr<T>>(arr: T, k: K) {
  return arr.map(({ [k]: v }: E) => {
    return v
  })
}

// 2
function getNoReptValuesItem(arr: any[]) {
  const data: any[] = []
  return arr.filter((item) => !data.includes(item) && data.push(item))
}

export function getNoReptItem<T extends ItemType<T>[], K extends keyof EleOfArr<T> = keyof EleOfArr<T>>(arr: T, k: K) {
  const data: ItemType<T>[] = []
  // 1 获取对象中某个元素的值组成的数组
  let oneItemValues: any[] = getOneitemValuesFrmArr(arr, k)
  // 2 对oneItemValues数组去重
  let noRepOneItemValues = getNoReptValuesItem(oneItemValues)
  // 3 对对象去重
  arr.filter((item) => {
    // 如果数组中元素是否包含在这个第二步中元素的值数组中
    if (noRepOneItemValues.includes(item[k])) {
      noRepOneItemValues.splice(noRepOneItemValues.indexOf(item[k]), 1)
      return data.push(item)
    }
  })
  return data
}

/** 合并关联的 */
export function commbineRelativeCtgy<T extends ItemType<T>[]>(arr: T, relativeKey: string, relativeValues: any) {
  return arr.map((item) => {
    return combine(item, { [relativeKey]: relativeValues })
  })
}

type UnionTolntersection<U> = (U extends any ? (args: U) => void : never) extends (args: infer I) => void ? I : never

export function combine<T extends object[]>(...args: T): UnionTolntersection<T[number]>
export function combine<T extends object[]>(...t: T) {
  return t.reduce((pre, cur, index) => {
    return { ...pre, ...cur }
  }, {})
}