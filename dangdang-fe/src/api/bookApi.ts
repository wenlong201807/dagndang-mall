import request from '@/utils/axiosUtil'
class BookAPI {
  static api: BookAPI = new BookAPI()

  findBookList(thirdCtgyid: number, pageNo: number = 1, pageSize: number = 6) {
    return request.get(`/booksmodule/findBooksByThirdCtgyId/${thirdCtgyid}/${pageNo}/${pageSize}`, false)
  }

  findBookRisefal(thirdctgyid: number, risefall: string) {
    return request.get(`/booksmodule/findBookRisefall/${risefall}/${thirdctgyid}`, false)
  }
  findBookDetail(ISBN: string) {
    return request.get(`/booksmodule/findBookDetail/${ISBN}`, false)
  }

  // 首页【无页面】下拉加载分页【手写实现】
  findBookWithPager(curPageNo: number) {
    return request.get(`/booksmodule/findBookListWithPager/${curPageNo}`, false)
  }

  // 排序接口 忽略
}

export default BookAPI.api
