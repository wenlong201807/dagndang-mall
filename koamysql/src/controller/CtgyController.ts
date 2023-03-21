import { success } from '../common/ResResult'
import redisConf, { RedisClient } from '../conf/Redisconfig'
import { Context } from 'koa'
import { get, post } from '../decorator/reqmethoddecorator'
import ctgyDao from '../modules/ctgy/dao/CtgyDao'
import CtgyService from '../modules/ctgy/service/CtgyService'
import { Controller } from '../decorator/controllerdecorator'

// 装饰器的执行顺序： 先执行方法的装饰器，再执行类的装饰器
@Controller('/ctgymodule')
class CtgyController {
  // http:localhost:3005/dang/ctgymodule/testRedis
  @get('/testRedis')
  async testRedis(ctx: Context) {
    const redisClient: RedisClient = redisConf.redisServerConf()
    redisClient.hmset('custom', 'name', 'lisi66', 'age', 283)
    console.log('99', 22)

    ctx.body = await redisClient.hmget('custom', 'name', 'age')
  }

  @get('/findSecThrdCtgys/:firstctgyid')
  async findSecThrdCtgys(ctx: Context) {
    const { firstctgyid } = ctx.params
    ctx.body = success(await ctgyDao.findSecThrdCtgys(firstctgyid))
  }
  // 原生实现
  @get('/findSecThrdCtgysSQL/:firstctgyid')
  async findSecThrdCtgysSQL(ctx: Context) {
    const { firstctgyid } = ctx.params
    console.log(88, firstctgyid)
    ctx.body = success(await ctgyDao.findSecThrdCtgysSQL(firstctgyid))
  }
  @get('/findFirstCtgys')
  async findFirstCtgys(ctx: Context) {
    const datas = success(await CtgyService.findFirstCtgys())
    ctx.body = datas
  }
}

// http:localhost:3005/dang/ctgymodule/findFirstCtgys
export {}
