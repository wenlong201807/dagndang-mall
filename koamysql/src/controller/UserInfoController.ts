import { success } from '../common/ResResult'
import { Context } from 'koa'
import { get } from '../decorator/reqmethoddecorator'
import UserDao from '../modules/userinfo/dao/UserDao'
import { Controller } from '../decorator/controllerdecorator'

// TS 装饰器 重构Koa 路由中的方法装饰器
@Controller('/userinfomodule')
class BooksController {
  // http://localhost:3005/dang/userinfomodule/findAllUser
  @get('/findAllUser')
  async findAllUser(ctx: Context) {
    ctx.body = success(await UserDao.findAllUser())
  }

  
}
