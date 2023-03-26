import { success } from '../common/ResResult'
import { Context } from 'koa'
import { post, get } from '../decorator/reqmethoddecorator'
import EvaluateDao from '../modules/evaluate/evaluateDao'
import { Controller } from '../decorator/controllerdecorator'

// http://localhost:3005/dang/evaluatemodule/findEvalReplyList/978-7-208

@Controller('/evaluatemodule')
class BooksController {
  @get('/findEvalReplyList/:ISBN')
  async findEvalReplyList(ctx: Context) {
    const { ISBN } = ctx.params
    const List = await EvaluateDao.findEvalReplyList(ISBN)
    ctx.body = success(List)
  }
}


