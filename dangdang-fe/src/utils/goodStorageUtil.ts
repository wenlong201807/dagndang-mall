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
/**
 ## 购物车中 添加或减少某本图书的数量
1. 目标洗哦啊过
  - 保证页面展示稳定，不闪屏，
  - 只改变当前图书的数量值，其他不改变
2. 解决方案
  - 深度ts + storage缓存
  ```
    export enum OPTION {
      account = 0,
      appendobjtoarr = 2
      none = -1
    }
  ```
3. 执行思路[实现新的购物对象追加或更新到购物数组的步骤]
  - 第一步：获取购物车中全部购物id值组成的数组
  - 第二步：用这个数组和新的购物对象的购物id进行比较，如果这个购物id不存在数组中，就直接push到数组中。如果存在，就从数组中获取改购物对象，直接覆盖
 */
type EleOfArr<T> = T extends Array<infer E> ? E : never
type SC = EleOfArr<typeof shopcartList>
const isPlainObject = (val: unknown): val is object => Object.prototype.toString.call(val) === '[object Object]'

/**
 * 难点
 * @param t
 * @param k
 * @returns 结果为 对象数组中，有每一项的id组成的一个新数组
 */
function getValArrOfObj<T extends any[], K extends keyof EleOfArr<T>, E = EleOfArr<T>>(t: T, k: K) {
  return t.map(({ [k]: v }): E => v, {})
}

export enum OPTION {
  ACCUMU = 0, // 数组累加
  ADDAPPENDOBJTOARR = 2, // 把对象添加或追加到时数组里面
  // TODO 少了减少的操作
  NONE = -1, // 什么都不加
}

class Storage {
  static storage: Storage = new Storage()

  // 多个函数签名，一个函数实现
  set(key: string, value: string): any // 新增购物字符串
  set(key: string, value: object): any // 新增购物对象
  set(key: string, value: any[]): any // 新增购物对象数组
  set(key: string, value: any[], options: OPTION): any // 追加或减少购物对象的数量
  set(key: string, value: Object, options: OPTION, propkey: string, propvalue: any): any
  set(key: string, value: Object, options: OPTION = OPTION.NONE, propkey: string = '', propvalue?: any) {
    if (isPlainObject(value) && options === OPTION.ADDAPPENDOBJTOARR) {
      // 类型守卫 追加或减少购物对象的数量
      const arr: any[] = goodStorage.get(key, [])
      const keyValsOfObj = getValArrOfObj(arr, propkey)
      // console.log('keyValsOfObj', keyValsOfObj)
      if (propkey.length > 0 && propvalue) {
        if (!keyValsOfObj.includes(propvalue)) {
          arr.push(value) // 不存在，则直接添加
        } else {
          const index = keyValsOfObj.indexOf(propvalue)

          if (index !== -1) arr[index] = value // 原来存在，则覆盖原来的
        }
        goodStorage.set(key, arr)
        // 执行测试 Storage.storage.set('shopcartList', newAddShopCart, 'shopcartid', 559)
        // 执行测试 Storage.storage.set('shopcartList', newAddShopCart2, 'shopcartid', 559)
        return arr
      }
    } else if (Array.isArray(value) && options === OPTION.ACCUMU) {
      // 类型守卫 添加购物对象
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

  /**
   * 1 获取good-storage 缓存中的购物车列表数组
   * 2 从缓存数组中获取所有 shopcartid 值 组成的数组
   * 3 获取要删除的shopcartid ，在2步中数组的索引
   * 4 第3步索引就是我们要删除的购物车列表中的图书对象，删除即可
   * 5 将删除后的购物车列表重新保存到good-storage中。
   * @param key 
   */
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
