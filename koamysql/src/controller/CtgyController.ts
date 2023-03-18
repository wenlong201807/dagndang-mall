import { success } from '../common/ResResult'
import redisConf, { RedisClient } from '../conf/Redisconfig'
import { Context } from 'koa'
import { get, post } from '../decorator/reqmethoddecorator'
import ctgyDao from '../modules/ctgy/dao/CtgyDao'
import CtgyService from '../modules/ctgy/service/CtgyService'
import { Controller } from '../decorator/controllerdecorator'

@Controller('/ctgymodule')
class CtgyController {
  @get('/findSecThrdCtgys/:firstctgyid')
  async findSecThrdCtgys(ctx: Context) {
    const { firstctgyid } = ctx.params
    ctx.body = success(await ctgyDao.findSecThrdCtgys(firstctgyid))
  }
  @get('/findFirstCtgys')
  async findFirstCtgys(ctx: Context) {
    const datas = success(await CtgyService.findFirstCtgys())
    ctx.body = datas
  }
}

// http:localhost:3005/dang/ctgymodule/findFirstCtgys
export {}