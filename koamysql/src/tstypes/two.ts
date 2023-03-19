import { secThrCtgy, EleOfArr, ItemType } from './one'
// 1 获取数组对象元素单个属性值组成的数组
function getOneitemValuesFrmArr<T extends ItemType<T>[], K extends keyof EleOfArr<T>, E = EleOfArr<T>>(arr: T, k: K) {
  return arr.map(({ [k]: v }: E) => {
    return v
  })
}

// 2 对第一步数组去重
function getNoReptValuesItem(arr: any[]) {
  const data: any[] = []
  return arr.filter((item) => !data.includes(item) && data.push(item))
}

// 对象去重
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

// getNoReptItem(secThrCtgy, 'secondctgyid')
