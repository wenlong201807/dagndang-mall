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
    console.log(13, ShopCartClass.store.getShopCartList)
  }
  static handlecheckItem(shopcart: ShopCart) {
    console.log(26, shopcart)

    storage.set('shopCartList', shopcart, OPTION.ADDAPPENDOBJTOARR, 'shopcartid', shopcart.shopcartid)
    ShopCartClass.store.storeShopCartList(storage.get('shopCartList'))
    const isSelectAll = ShopCartClass.store.getShopCartList.every((shopcart) => {
      return shopcart.checked
    })
    ShopCartClass.isSelectAll.value = isSelectAll
  }
  static handleCheckAll() {
    const shopCartList = ShopCartClass.store.getShopCartList.map((shopcart) => {
      shopcart.checked = ShopCartClass.isSelectAll.value
      return shopcart
    })
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
    const shopCart: ShopCart = {
      userid: 1,
      checked: book.checked,
      bookisbn: book.bookisbn,
      bookname: book.bookname,
      shopcartid: book.shopcartid,
      bookpicname: book.bookpicname,
      bookprice: book.bookprice,
      purcharsenum: type === '+' ? ++book.purcharsenum : --book.purcharsenum,
    }
    // console.log('购物车列表页面:', shopCart)

    if (shopCart.purcharsenum === 0) {
      ShopCartClass.delBookFrmSC(book)
      return
    }
    await ShopCartClass.store.appOrSubtrBookFrmShopCart(shopCart)
  }
  /**
   * 在图书列表页面 中执行 追加或减少 购物对象列表的购物数量
   * @param type
   * @param book
   * @param event
   * @returns
   */
  static async appOrSubtrBookFrmShopCart(type: any, book: ShopCart, event: Event) {
    const shopCart: ShopCart = {
      userid: 1,
      checked: book.checked,
      bookisbn: book.ISBN ? book.ISBN : book.bookisbn,
      bookname: book.bookname,
      shopcartid: ShopCartClass.getExistsShopCartID(book),
      bookpicname: book.bookpicname,
      bookprice: procDecimalZero(book.originalprice * book.discount),
      purcharsenum: type === '+' ? ++book.purcharsenum : --book.purcharsenum,
    }
    // console.log('图书列表页面:', shopCart)

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
              console.log(totalPrice_)
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
  static beforeEnter(ele: Element) {
    const curBallEle_ = ele as HTMLBodyElement
    console.log('curBallEle_', curBallEle_)

    // 1. 获取追加图书按钮对象
    const addBtnEle = <HTMLBodyElement>ShopCartClass.ball.value.addBtnCurTarget
    // 2. 计算底部小球移动到按钮对象位置坐标
    const addBtnEleRect = addBtnEle.getBoundingClientRect()
    const x = addBtnEleRect.left - 35
    const y = -(window.innerHeight - addBtnEleRect.top - 22)
    curBallEle_.style.transform = `translate3d(0, ${y}px,0)`
    const inner = curBallEle_.getElementsByClassName('inner-ball')[0] as HTMLBodyElement
    inner.style.transform = `translate3d(${x}px, 0,0)`
  }
  static dropping(ele: Element, done: (...args: any) => any) {
    document.body.scrollHeight // 重绘
    const curBallEle_ = ele as HTMLBodyElement
    curBallEle_.style.transform = `translate3d(0,0,0)`
    const inner = curBallEle_.getElementsByClassName('inner-ball')[0] as HTMLBodyElement
    inner.style.transform = `translate3d(0, 0,0)`
    done()
  }
  static afterEnter(ele: Element) {
    ShopCartClass.ball.value.isVisible = false
    ShopCartClass.ball.value.addBtnCurTarget = undefined
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
