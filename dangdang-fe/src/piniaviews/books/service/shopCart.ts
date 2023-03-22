import { storeToRefs } from 'pinia'
import { Ref, ref } from 'vue'
import shopCartStore from '@/piniastore/shopCart'
import { BookInfo } from '@/piniastore/book/state'
import { ShopCart } from '@/piniastore/shopCart/state'
import storage, { OPTION } from '@/utils/goodStorageUtil'

import Books from './index'
import { computed } from 'vue'
type BallType = {
  isVisible: boolean
  addBtnCurTarget?: EventTarget | null
}

// 页面中 购物车列表 js抽离
export default class ShopCartClass {
  static isSelectAll = ref(false)
  static store = shopCartStore()
  static storeRefs = storeToRefs(ShopCartClass.store)
  static ball: Ref<BallType> = ref({ isVisible: false })

  static async findShopCartList() {
    await ShopCartClass.store.findShopCartList(1)
  }
  // 正向 点击 购物车列表页面的 checkobox
  static handlecheckItem(shopcart: ShopCart) {
    // console.log(26, shopcart)
// 有bug： 取消选中的时候，其他的也会被取消
    storage.set('shopCartList', shopcart, OPTION.ADDAPPENDOBJTOARR, 'shopcartid', shopcart.shopcartid)
    ShopCartClass.store.storeShopCartList(storage.get('shopCartList'))

    // 反向控制是否全选 
    const isSelectAll = ShopCartClass.store.getShopCartList.every((shopcart) => {
      return shopcart.checked
    })

    // 缓存和store必须同步变更
    ShopCartClass.store.storeShopCartList(ShopCartClass.store.getShopCartList)
    ShopCartClass.isSelectAll.value = isSelectAll
  }
  // 反向控制是否全选
  // static checkEveryCheckbox(shopcartItem: ShopCart, index: number, val: any) {
  //   const isSelectAll = ShopCartClass.store.getShopCartList.every((shopcart) => {
  //     return shopcart.checked;
  //   })
  //   console.log('isSelectAll', isSelectAll)
  //   ShopCartClass.isSelectAll.value = isSelectAll
  // }
  static handleCheckAll() {
    const shopCartList = ShopCartClass.store.getShopCartList.map((shopcart) => {
      shopcart.checked = ShopCartClass.isSelectAll.value
      return shopcart
    })
    // 更新store状态
    ShopCartClass.store.storeShopCartList(shopCartList)
  }
  static async handleAddBookToShopCart(book: BookInfo) {
    const shopCart: ShopCart = {
      userid: 1,
      checked: false,
      bookisbn: book.ISBN,
      bookname: book.bookname,
      bookpicname: book.bookpicname,
      bookprice: procDecimalZero(book.originalprice * book.discount),
      purcharsenum: 1,
    }

    // 更新接口数据
    await ShopCartClass.store.addBookToShopCart(shopCart)
    // 更新页面的展示值：将store数据更新即可
    await ShopCartClass.uptBookNumWithSCLstNum(Books.bookList.value)
  }

  static getExistsShopCartID(book: ShopCart) {
    let shopCartList = ShopCartClass.storeRefs.getShopCartList
    const { shopcartid } = shopCartList.value.find((item: ShopCart) => item.bookisbn === (book.ISBN ? book.ISBN : book.bookisbn))
    return shopcartid
  }
  static async delBookFrmSC(book: ShopCart) {
    // TODO 图书列表页面，购物车列表页面 缺少 删除按钮
    // console.log('删除购物对象book', book, ShopCartClass.getExistsShopCartID(book))
    ShopCartClass.store.delBookFrmSC(ShopCartClass.getExistsShopCartID(book))
  }
  static drop(event: Event) {
    ShopCartClass.ball.value.isVisible = true
    ShopCartClass.ball.value.addBtnCurTarget = event.currentTarget
  }

  /**
   * 在购物车列表页面 中执行 追加或减少 购物对象列表的购物数量
   * @param type
   * @param book
   * @param event
   * @returns
   */
  static async appOrSubtrBookFrmShoListCart(type: any, book: ShopCart, event: Event) {
    let newNum = 0
    if (type === '+') {
      newNum = book.purcharsenum + 1
    } else {
      if (book.purcharsenum > 0) {
        newNum = book.purcharsenum - 1
      }
    }
    // 响应式数据更新，ui需要同步更新
    book.purcharsenum = newNum

    if (book.purcharsenum === 0) {
      ShopCartClass.delBookFrmSC(book)
      return
    }
    await ShopCartClass.store.appOrSubtrBookFrmShopCart(book)

    // 添加的时候，有动画效果
    const curTarget = <HTMLBodyElement>event.currentTarget
    const className = curTarget?.className || ''

    if (type === '+' && className.includes('add-btn-move')) {
      // curTarget.className = className.replace(' add-btn', '')
      ShopCartClass.drop(event)
    } else {
      // curTarget.className += ` add-btn`
    }
  }
  /**
   * 在图书列表页面 中执行 追加或减少 购物对象列表的购物数量
   * @param type
   * @param book
   * @param event
   * @returns
   */
  static async appOrSubtrBookFrmShopCart(type: any, book: ShopCart, event: Event) {
    let newNum = 0
    if (type === '+') {
      newNum = book.purcharsenum + 1
    } else {
      if (book.purcharsenum > 0) {
        newNum = book.purcharsenum - 1
      }
    }
    // 响应式数据更新，ui需要同步更新
    book.purcharsenum = newNum

    const shopCart: ShopCart = {
      userid: 1,
      checked: book.checked,
      bookisbn: book.ISBN ? book.ISBN : book.bookisbn,
      bookname: book.bookname,
      shopcartid: ShopCartClass.getExistsShopCartID(book),
      bookpicname: book.bookpicname,
      bookprice: procDecimalZero(book.originalprice * book.discount),
      purcharsenum: newNum,
      // purcharsenum: type === '+' ? ++book.purcharsenum : --book.purcharsenum,
    }
    // console.log('图书列表页面:', shopCart)
    // 添加的时候，有动画效果
    const curTarget = <HTMLBodyElement>event.currentTarget
    const className = curTarget.className

    if (type === '+' && className.includes('add-btn-move')) {
      // curTarget.className = className.replace(' add-btn', '')
      ShopCartClass.drop(event)
    } else {
      // curTarget.className += ` add-btn`
    }

    if (shopCart.purcharsenum === 0) {
      ShopCartClass.delBookFrmSC(book)
      return
    }
    await ShopCartClass.store.appOrSubtrBookFrmShopCart(shopCart)
  }
  // 将图书列表的购物图书数量状态同步到购物车列表中
  static uptBookNumWithSCLstNum(bookList: BookInfo[]) {
    const shopCartList = ShopCartClass.store.getShopCartList
    if (shopCartList) {
      shopCartList.forEach((shopCart: ShopCart) => {
        bookList.forEach((book) => {
          if (shopCart.bookisbn === book.ISBN) {
            book.purcharsenum = shopCart.purcharsenum
          }
        })
      })
    }
  }
  /**
   * 页面购物车数量变化时，支付总价同步更新
   * @param checked
   * @returns
   */
  static refreshShopCartList(checked = false) {
    // 返回响应式数据，同步更新页面 computed，以及内部使用的原始数据都必须是响应式数据
    const totalCount = computed(() => {
      let totalCount_ = 0
      const shopcartList: ShopCart[] = ShopCartClass.store.getShopCartList
      // console.log('获取响应式购物车对象总数量：', shopcartList)

      if (shopcartList && shopcartList.length > 0) {
        shopcartList.forEach((shopcart) => {
          totalCount_ += shopcart.purcharsenum
        })
      }
      return totalCount_
    })
    const totalPrice = computed(() => {
      let totalPrice_ = 0
      const shopcartList: ShopCart[] = ShopCartClass.store.getShopCartList
      // console.log('获取响应式购物车对象总价格：', shopcartList)

      if (shopcartList && shopcartList.length > 0) {
        shopcartList.forEach((shopcart) => {
          if (shopcart.purcharsenum && shopcart.bookprice) {
            if (!checked) {
              totalPrice_ += shopcart.purcharsenum * shopcart.bookprice
              // console.log(totalPrice_)
            } else {
              if (shopcart.checked) {
                totalPrice_ += shopcart.purcharsenum * shopcart.bookprice
              }
            }
          }
        })
      }
      return procDecimalZero(totalPrice_)
    })

    // TODO 点击购物车加减，添加购物车按钮时没有执行这一行？？？
    // 只有刷新浏览器的时候才执行？？
    // console.log('更新后，最新的总量和总价', totalCount.value, totalPrice.value)
    return {
      totalCount,
      totalPrice,
    }
  }
  /**
   * 1 获取追加图书按钮对戏那个
   * 2 计算底部小球移动到按钮对象位置的坐标
   * @param ele
   */
  static beforeEnter(ele: Element) {
    const curBallEle_ = ele as HTMLBodyElement
    // console.log('curBallEle_开始动画', curBallEle_)

    // 1. 获取追加图书按钮对象
    const addBtnEle = <HTMLBodyElement>ShopCartClass.ball.value.addBtnCurTarget
    // 2. 计算底部小球移动到按钮对象位置坐标
    const addBtnEleRect = addBtnEle.getBoundingClientRect()
    const x = addBtnEleRect.left - 35
    const y = -(window.innerHeight - addBtnEleRect.top - 22)
    // console.log('xy:', x, y)
    curBallEle_.style.transform = `translate3d(0, ${y}px,0)` // 只能使用px rem无效
    const inner = curBallEle_.getElementsByClassName('inner-ball')[0] as HTMLBodyElement
    inner.style.transform = `translate3d(${x}px, 0,0)`
  }
  static dropping(ele: Element, done: (...args: any) => any) {
    // console.log('动画...进行中')
    document.body.scrollHeight // 重绘 -> dom更新 -> nextTick执行
    const curBallEle_ = ele as HTMLBodyElement
    curBallEle_.style.transform = `translate3d(0,0,0)` // 回到自身的位置
    const inner = curBallEle_.getElementsByClassName('inner-ball')[0] as HTMLBodyElement
    inner.style.transform = `translate3d(0, 0,0)`
    done()
  }
  static afterEnter(ele: Element) {
    // console.log('动画结束')
    ShopCartClass.ball.value.isVisible = false
    ShopCartClass.ball.value.addBtnCurTarget = null
  }
}

function procDecimalZero(num: number) {
  let strVal = num.toString()
  const splitVal = strVal.split('.')
  if (splitVal.length === 1) {
    // 整数
    strVal = strVal + '.00'
  } else if (splitVal.length > 1) {
    // 只有一位小数
    if (splitVal[1].length === 1) {
      strVal = strVal + '0'
    } else if (splitVal[1].length > 2) {
      strVal = num.toFixed(2).toString()
    }
  }
  return strVal as any as number
}
