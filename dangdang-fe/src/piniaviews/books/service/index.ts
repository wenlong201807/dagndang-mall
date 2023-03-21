import router from '@/router'
import { Ref, ref } from 'vue'
import bookAPI from '@/api/bookApi'
import { BookInfo } from '@/piniastore/book/state'
import { toFixed_ } from '@/common/index'
import ShopCartClass from './shopCart'
import bookStore from '@/piniastore/book/index'
import { storeToRefs } from 'pinia'

export default class Books {
  constructor(config?: any) {
    Books.thirdctgyid.value = config?.route.params.thirdctgyid
  }
  static store = bookStore()
  static storeRef = storeToRefs(Books.store) // 响应式store 数据
  static page: number = 1
  static size: number = 5
  static currentIndex = ref<number>(0) // 响应式 页面数据
  static isReadyAsc = ref<boolean>(false)
  static thirdctgyid = ref<number>(0)
  static bookList: Ref<BookInfo[]> = ref([])
  static hasMoreData: Ref<boolean> = ref(false)
  static isLoading: Ref<boolean> = ref(false)

  changeTab(thirdctgyid: number) {
    Books.thirdctgyid.value = thirdctgyid
    Books.reset()
    console.log(Books.bookList.value)
    Books.findBooksByThirdCtgyId()
  }

  getBookDataPager() {
    if (!Books.hasMoreData.value) {
      Books.page += 1
      Books.findBooksByThirdCtgyId()
    }
  }

  static async findBooksByThirdCtgyId() {
    if (Books.hasMoreData.value) {
      return Books.bookList.value
    }

    const thirdctgyid = Books.thirdctgyid.value
    const { page, size } = Books
    const bookList = await bookAPI.findBookList(thirdctgyid, page, size)
    await Books.store.findBooksByThirdCtgyId(thirdctgyid, page, size)
    const res = Books.store.findBookList

    bookList.data.data.map((book: BookInfo) => {
      book.discountprice = toFixed_(book.discount * book.originalprice)
      book.purcharsenum = 0
      return book
    })

    Books.hasMoreData.value = bookList.data.paging.hasMoreData
    Books.bookList.value = Books.bookList.value.concat(bookList.data.data)
    Books.isLoading.value = false

    const shopCartList = ShopCartClass.store.shopCartList
    if (!shopCartList.length) {
      await ShopCartClass.findShopCartList()
    }
    await Books.uptBookNumWithSCLstNum()
  }

  static uptBookNumWithSCLstNum() {
    ShopCartClass.uptBookNumWithSCLstNum(Books.bookList.value)
  }

  static async handleriseOrfall(event: string) {
    const thirdctgyid = Books.thirdctgyid.value
    Books.isReadyAsc.value = !Books.isReadyAsc.value
    const risefall = event
    const { data } = await bookAPI.findBookRisefal(thirdctgyid, risefall)
    Books.bookList.value = data
  }

  static handleSyntheSize() {
    Books.findBooksByThirdCtgyId()
  }

  static changLoading(isLoading: boolean) {
    Books.isLoading.value = isLoading
  }

  static reset() {
    Books.bookList.value = []
    Books.hasMoreData.value = false
    Books.page = 1
  }

  static back() {
    router.back()
    Books.reset()
  }
}
