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
    await ShopCartClass.store.addBookToShopCart(shopCart)
    await ShopCartClass.uptBookNumWithSCLstNum(Books.bookList.value)
  }

  static getExistsShopCartID(book: ShopCart) {
    let shopCartList = ShopCartClass.storeRefs.getShopCartList
    const { shopcartid } = shopCartList.value.find((item: ShopCart) => item.bookisbn === (book.ISBN ? book.ISBN : book.bookisbn))
    return shopcartid
  }
  static async delBookFrmSC(book: ShopCart) {
    console.log(ShopCartClass.getExistsShopCartID(book))
    ShopCartClass.store.delBookFrmSC(ShopCartClass.getExistsShopCartID(book))
  }
  static drop(event: Event) {
    ShopCartClass.ball.value.isVisible = true
    ShopCartClass.ball.value.addBtnCurTarget = event.currentTarget
  }
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
    console.log(shopCart)

    if (shopCart.purcharsenum === 0) {
      ShopCartClass.delBookFrmSC(book)
      return
    }
    await ShopCartClass.store.appOrSubtrBookFrmShopCart(shopCart)
  }
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
    console.log(shopCart)

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
  static refreshShopCartList(checked = false) {
    const totalCount = computed(() => {
      let totalCount_ = 0
      const shopcartList: ShopCart[] = ShopCartClass.store.getShopCartList
      console.log(shopcartList)

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
      if (shopcartList && shopcartList.length > 0) {
        console.log('shopcartList', shopcartList)
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
    console.log(totalCount.value, totalPrice.value)

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
