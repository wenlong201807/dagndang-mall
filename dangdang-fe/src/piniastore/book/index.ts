import { defineStore } from 'pinia'
import { BookInfo } from './state'
import bookApi from '@/api/bookApi'
import { AxiosResponse } from 'axios'

export default defineStore('bookStore', {
  state: () => {
    return {
      bookList: [] as BookInfo[],
    }
  },
  getters: {
    findBookList(state) {
      return state.bookList
    },
  },
  actions: {
    async findBooksByThirdCtgyId(thirdCtgyid: number, page: number, size: number) {
      const bookList: AxiosResponse<BookInfo[]> = await bookApi.findBookList(thirdCtgyid, page, size)
      this.bookList = bookList.data
    },
  },
})
