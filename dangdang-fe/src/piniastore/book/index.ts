import { defineStore } from 'pinia'
import { BookInfo, CurPageDataType } from './state'
import bookApi from '@/api/bookApi'
import { AxiosResponse } from 'axios'

type InitStateType = {
  isbn: string
  bookList: BookInfo[]
  curPageAllData: CurPageDataType
  bookDetail: BookInfo
  // operate: Operate,
  // publisherList: Publisher[]
}

const initState: InitStateType = {
  isbn: '',
  bookList: [],
  curPageAllData: { curPageNo: 0, curPageDataList: [], totalPageNum: 0 },
  bookDetail: {} as BookInfo,
}
export default defineStore('bookStore', {
  state: () => {
    return initState
  },
  getters: {
    pageDataGetter(state) {
      return state.curPageAllData
    },
    pageBookListGetter(state) {
      return state.curPageAllData.curPageDataList
    },
    BookListGetter(state) {
      return state.bookList
    },
    // 判断是否到了最后一页
    isLastPageGetter(state): boolean {
      return state.curPageAllData.curPageNo === state.curPageAllData.totalPageNum
    },
  },
  actions: {
    // 对应页面路由 books/3
    async findBooksByThirdCtgyId(thirdCtgyid: number, page: number, size: number) {
      const bookList: AxiosResponse<BookInfo[]> = await bookApi.findBookList(thirdCtgyid, page, size)
      this.bookList = bookList.data
    },
    //
    async findBookWithPagerAction() {
      // 注意这里的条件需要和 滚动触底 加载更多相配合【边界条件】
      if (!this.curPageAllData.curPageNo || this.curPageAllData.curPageNo < this.curPageAllData.totalPageNum) {
        // 此写法可以提高cpu运算
        this.curPageAllData.curPageNo = this.curPageAllData.curPageNo + 1
        const curPageDatas: AxiosResponse<CurPageDataType> = await bookApi.findBookWithPager(this.curPageAllData.curPageNo)

        // 如果是第一页
        if (this.curPageAllData.curPageDataList.length === 1) {
          this.curPageAllData = curPageDatas.data
        } else {
          const { curPageNo, totalPageNum } = curPageDatas.data
          this.curPageAllData.curPageDataList.push(...curPageDatas.data.curPageDataList)
          Object.assign(this.curPageAllData, { curPageNo, totalPageNum })
        }
      }
    },
  },
})
