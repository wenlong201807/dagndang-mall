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
  console.log('弊端: 原生sql执行三表级联查询，需要额外做数据格式转换:', lastSecThrCtgyList)
  return lastSecThrCtgyList
}

type ItemType<T extends object[]> = {
  [K in keyof EleOfArr<T>]: EleOfArr<T>[K]
}

type T = [{ secondctgyid: string }, { secctgyname: string }, { secondctgyid: number }, { thirdctgyid: number }, { thirdctgyname: string }]

/*
源数据格式
const oridata = [
  {
    secondctgyid: 2,
    secctgyname: 'adv22',
    firstctgyId: 2, // 核心字段
    thirdctgyid: 1,
    thirdctgyname: 'dgfbv e',
    secctgyid: 2,
  },
  {
    secondctgyid: 2,
    secctgyname: 'adv22',
    firstctgyId: 2, // 核心字段
    thirdctgyid: 2,
    thirdctgyname: '33efbw',
    secctgyid: 2,
  },
]
*/
/*
目标数据格式
const rdata = [
  {
    secondctgyid: 2,
    secctgyname: 'adv22',
    thirdctgys: [
      {
        thirdctgyid: 1,
        thirdctgyname: 'dgfbv e',
        secctgyid: 2,
      },
      {
        thirdctgyid: 2,
        thirdctgyname: '33efbw',
        secctgyid: 2,
      },
    ],
  },
]
*/


