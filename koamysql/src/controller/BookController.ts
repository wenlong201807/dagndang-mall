import { success } from '../common/ResResult'
import { Context } from 'koa'
import { get, post } from '../decorator/reqmethoddecorator'
import BookDao from '../modules/books/dao/BookDao'
import { Controller } from '../decorator/controllerdecorator'

// http://localhost:3005/dang/booksmodule/findBooksByThirdCtgyId/1/1/1
// TS 装饰器 重构Koa 路由中的方法装饰器
@Controller('/booksmodule')
class BooksController {
  @get('/findBookListWithPager/:curPageNo')
  async findBookListWithPager(ctx: Context) {
    const { curPageNo } = ctx.params
    const curPageAllList = await BookDao.findBookListWithPager(curPageNo)

    ctx.body = success(curPageAllList)
  }

  @get('/findBooksByThirdCtgyId/:thirdctgyid/:pageNo/:pageSize')
  async findBooksByThirdCtgyId(ctx: Context) {
    const { thirdctgyid, pageNo, pageSize } = ctx.params
    const offset = (pageNo - 1) * pageSize
    ctx.body = success(await BookDao.findBooksByThirdCtgyId(thirdctgyid, offset, parseInt(pageSize)))
  }

  @get('/findBookRisefall/:risefall/:thirdctgyid')
  async findBookRisefall(ctx: Context) {
    const { risefall, thirdctgyid } = ctx.params
    ctx.body = success(await BookDao.findBookRisefall(thirdctgyid, risefall))
  }
  // https://portfolio-edward32tnt.vercel.app/
  // http://localhost:3005/dang/booksmodule/findBookDetail/1
  @get('/findBookDetail/:ISBN')
  async findBookDetail(ctx: Context) {
    const { ISBN } = ctx.params
    console.log('isbn-成功:', ISBN, ctx.params)
    ctx.body = success(await BookDao.findBookDetail(ISBN))
  }

  // postman 测试ok
  @post('/findBooksByPublishIds')
  async findBooksByPublishIds(ctx: Context) {
    const  publishids: number[] = ctx.request.body
    ctx.body = success(await BookDao.findBooksByPublishIds(publishids))
  }

  // postman 测试ok
  @get('/findBooksByAutoCompKeyword/:autocompKeyword')
  async findBooksByAutoCompKeyword(ctx: Context) {
    const { autocompKeyword } = ctx.params
    ctx.body = success(await BookDao.findBooksByAutoCompKeyword(autocompKeyword))
  }


  // http://localhost:3005/dang/booksmodule/book
  @get('/book')
  async findBookDetailq(ctx: Context) {
    ctx.body = '99'
  }
}
