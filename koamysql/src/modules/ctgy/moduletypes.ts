import { getNoReptItem, commbineRelativeCtgy, combine, EleOfArr, getSubItemFrmArr } from '../commontypes'

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
  let thrdCtgyList = getSubItemFrmArr(secThrCtgy, 'thirdctgyid', 'thirdctgyname', 'secctgyid')
  const relativeSecThrCtgyLst = commbineRelativeCtgy(noReptSecCtgyList, 'thirdctgys', [])
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

type ItemType<T extends object[]> = {
  [K in keyof EleOfArr<T>]: EleOfArr<T>[K]
}

type T = [{ secondctgyid: string }, { secctgyname: string }, { secondctgyid: number }, { thirdctgyid: number }, { thirdctgyname: string }]
