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

  @get('/searchKeywords/:key')
  async searchKeywords(ctx: Context) {
    const { key } = ctx.params
    const keyworList = await SearchService.searchKeywords(key)
    ctx.body = success(keyworList)
  }

  @get('/searchDiscovery')
  async searchDiscovery(ctx: Context) {
    const historykeyworList = await SearchService.searchDiscovery()
    ctx.body = success(historykeyworList)
  }

}
