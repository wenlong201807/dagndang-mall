import { success } from '../common/ResResult'
import { Context } from 'koa'
import { post, get } from '../decorator/reqmethoddecorator'
import SearchService from '../modules/search/service/SearchService'
import { Controller } from '../decorator/controllerdecorator'

// http://localhost:3005/dang/searchmodule/addOrUpdateHistoryKeyword

@Controller('/searchmodule')
class BooksController {

  @post('/addOrUpdateHistoryKeyword')
  async addOrUpdateHistoryKeyword(ctx: Context) {
    const { historykeyword } = ctx.request.body
    const result = await SearchService.addOrUpdateHistoryKeyword(historykeyword)
    ctx.body = success(result)
  }

  @get('/SearchKyewords/:key')
  async SearchKyewords(ctx: Context) {
    const { key } = ctx.params
    const keyworList = await SearchService.SearchKyewords(key)
    ctx.body = success(keyworList)
  }

}
