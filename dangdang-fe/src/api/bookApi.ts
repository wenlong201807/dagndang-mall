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
}

export default BookAPI.api
