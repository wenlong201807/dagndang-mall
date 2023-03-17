import goodStorage from 'good-storage'

const shopcartList = [
  {
    shopcartid: 551,
    bookisbn: '978-7-255',
    bookname: '字母表谴案.六年级趣味书',
    bookpicname: '紫图经典文库.png',
    bookprice: 33,
  },
  {
    shopcartid: 553,
    bookisbn: '978-7-205',
    bookname: '瓦尔登湖:世界上最修心的地方',
    bookpicname: '紫图经典文库.png',
    bookprice: 33,
  },
  {
    shopcartid: 555,
    bookisbn: '978-7-206',
    bookname: '活着，有点兴致',
    bookpicname: '紫图经典文库.png',
    bookprice: 33,
  },
  {
    shopcartid: 556,
    bookisbn: '978-7-214',
    bookname: '紫图经典文库三岛由纪夫大集合(1册)',
    bookpicname: '紫图经典文库.png',
    bookprice: 33,
  },
  {
    shopcartid: 557,
    bookisbn: '978-7-207',
    bookname: '白夜行',
    bookpicname: '紫图经典文库.png',
    bookprice: 33,
  },
  {
    shopcartid: 558,
    bookisbn: '978-7-259',
    bookname: '紫图经典文床三岛由纪夫大集合(10册)',
    bookpicname: '紫图经典文库.png',
    bookprice: 33,
  },
]

const newAddShopCart = {
  shopcartid: 559,
  bookisbn: '978-7-104',
  bookname: 'cbssda',
  bookpicname: 'undefined',
  bookprice: 23,
}
const newAddShopCart2 = {
  shopcartid: 600,
  bookisbn: '978-7-104',
  bookname: 'cba',
  bookpicname: 'undefined',
  bookprice: 23,
}

type EleOfArr<T> = T extends Array<infer E> ? E : never
type SC = EleOfArr<typeof shopcartList>
const isPlainObject = (val: unknown): val is object => Object.prototype.toString.call(val) === '[object Object]'

function getValArrOfObj<T extends any[], K extends keyof EleOfArr<T>, E = EleOfArr<T>>(t: T, k: K) {
  return t.map(({ [k]: v }): E => v, {})
}

export enum OPTION {
  ACCUMU = 0, // 数组累加
  ADDAPPENDOBJTOARR = 2, // 把对象添加或追加到时数组里面
  NONE = -1, // 什么都不加
}

class Storage {
  static storage: Storage = new Storage()

  set(key: string, value: string): any
  set(key: string, value: object): any
  set(key: string, value: any[]): any
  set(key: string, value: any[], options: OPTION): any
  set(key: string, value: Object, options: OPTION, propkey: string, propvalue: any): any
  set(key: string, value: Object, options: OPTION = OPTION.NONE, propkey: string = '', propvalue?: any) {
    if (isPlainObject(value) && options === OPTION.ADDAPPENDOBJTOARR) {
      const arr: any[] = goodStorage.get(key, [])
      const keyValsOfObj = getValArrOfObj(arr, propkey)
      console.log('keyValsOfObj', keyValsOfObj)
      if (propkey.length > 0 && propvalue) {
        if (!keyValsOfObj.includes(propvalue)) {
          arr.push(value)
        } else {
          console.log(propvalue)
          const index = keyValsOfObj.indexOf(propvalue)
          console.log(index)
          if (index !== -1) arr[index] = value
        }
        goodStorage.set(key, arr)
        return arr
      }
    } else if (Array.isArray(value) && options === OPTION.ACCUMU) {
      const arr: any[] = goodStorage.get(key, [])
      arr.push(...value)
      goodStorage.set(key, arr)
      return arr
    }
    goodStorage.set(key, value)
  }
  get(key: string): any
  get(key: string, options: OPTION): any
  get(key: string, options: OPTION = OPTION.NONE) {
    if (key.length) {
      if (options === OPTION.ACCUMU || options === OPTION.ADDAPPENDOBJTOARR) return goodStorage.get(key, [])
      else return goodStorage.get(key)
    }
  }

  remove(key: string): any
  remove(key: string, options: OPTION, propkey: string, propvalue: any): any
  remove(key: string, options: OPTION = OPTION.NONE, propkey: string = '', propvalue?: any) {
    if (options === OPTION.ADDAPPENDOBJTOARR) {
      const arr: any[] = goodStorage.get(key, [])
      const keyValsOfObj = getValArrOfObj(arr, propkey)
      const eleIndex = keyValsOfObj.indexOf(propvalue)
      if (eleIndex !== -1) {
        arr.splice(eleIndex, 1)
        goodStorage.set(key, arr)
      }
    }
  }
}

export default Storage.storage
