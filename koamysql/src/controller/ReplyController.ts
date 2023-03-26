import { success } from '../common/ResResult'
import { Context } from 'koa'
import { post, get } from '../decorator/reqmethoddecorator'
import ReplyService from '../modules/reply/ReplyService'
import { Controller } from '../decorator/controllerdecorator'

// http://localhost:3005/dang/replymodule/addReply

@Controller('/replymodule')
class ReplyController {

  // 指定用户给某一本书添加一条评论
  @post('/addReply')
  async addReply(ctx: Context) {
    const  reply  = ctx.request.body
    const lastdbReply = await ReplyService.addReply(reply)
    ctx.body = success(lastdbReply)
  }
}


