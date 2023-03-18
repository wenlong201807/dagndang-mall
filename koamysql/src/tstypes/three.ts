import { secThrCtgy, ItemType, EleOfArr, getSubItemFrmArr } from './one'
import { getNoReptItem } from './two'

/** 合并关联的 */
function commbineRelativeCtgy<T extends ItemType<T>[]>(
  arr: T,
  relativeKey: string,
  relativeValues: any
) {
  return arr.map((item) => {
    return combine(item, { [relativeKey]: relativeValues })
  })
}

type SecThrCtgyList = {
  secondctgyid: number
  secctgyname: string
  firstctgyId: number
  thirdctgyid: number
  thirdctgyname: string
  secctgyid: number
}[]

// 转化
export default function convert(secThrCtgy: SecThrCtgyList) {
  let secCtgyList = getSubItemFrmArr(secThrCtgy, 'secondctgyid', 'secctgyname')
  let noReptSecCtgyList = getNoReptItem(secCtgyList, 'secondctgyid')
  let thrdCtgyList = getSubItemFrmArr(
    secThrCtgy,
    'thirdctgyid',
    'thirdctgyname',
    'secctgyid'
  )
  const relativeSecThrCtgyLst = commbineRelativeCtgy(
    noReptSecCtgyList,
    'thirdctgys',
    []
  )

  const lastSecThrCtgyList: typeof relativeSecThrCtgyLst = [] // 最终的二级三级分类保存数组
  type LastSecThrCtgy = EleOfArr<typeof relativeSecThrCtgyLst>
  noReptSecCtgyList.map((noReptSecCtgy) => {
    const lastThrdList: typeof thrdCtgyList = []
    thrdCtgyList.forEach((thrdCtgy) => {
      if (noReptSecCtgy.secondctgyid === thrdCtgy.secctgyid) {
        lastThrdList.push({
          thirdctgyid: thrdCtgy.thirdctgyid,
          thirdctgyname: thrdCtgy.thirdctgyname,
          secctgyid: thrdCtgy.secctgyid,
        })
      }
    })
    const lastSecThrCtgy: LastSecThrCtgy = combine(noReptSecCtgy, {
      thirdctgys: lastThrdList,
    })
    lastSecThrCtgyList.push(lastSecThrCtgy)
  })
  console.log(lastSecThrCtgyList)
  return lastSecThrCtgyList
}

type T = [
  { secondctgyid: string },
  { secctgyname: string },
  { secondctgyid: number },
  { thirdctgyid: number },
  { thirdctgyname: string }
]

type TNumber = T[number] // 把数组切割成了联合类型

type UnionToFn<U> = U extends any ? (args: U) => void : never
type TestUnionToFn = UnionToFn<T[number]>

type UnionTolntersection<U> = (
  U extends any ? (args: U) => void : never
) extends (args: infer I) => void
  ? I
  : never
/**
 * TestUnionTolntersection 这里符合条件返回的值会是联合类型
 */
type TestUnionTolntersection = UnionTolntersection<T[number]>

// 方法重载
function combine<T extends object[]>(...args: T): UnionTolntersection<T[number]>
function combine<T extends object[]>(...t: T) {
  return t.reduce((pre, cur, index) => {
    return { ...pre, ...cur }
  }, {})
}

// const combineObj = combine({ username: 'wangwu', age: 23 }, { phone: 111 })
