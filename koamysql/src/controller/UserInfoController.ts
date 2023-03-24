import { fail, success } from '../common/ResResult'
import { Context } from 'koa'
import { get, post } from '../decorator/reqmethoddecorator'
import UserDao from '../modules/userinfo/dao/UserDao'
import { Controller } from '../decorator/controllerdecorator'
import UserinfoService from '../modules/userinfo/service/UserInfoService'
import { UserinfoRaw } from '@/modules/userinfo/raw'

// TS 装饰器 重构Koa 路由中的方法装饰器
@Controller('/userinfomodule')
class UserinfoController {
  @post('/login')
  async login(ctx: Context) {
    const userinfo: UserinfoRaw = ctx.request.body
    const r = await UserinfoService.login(userinfo)
    // 此路由排除在鉴权之外，需要额外处理异常
    if (r) {
      ctx.body = success(r)
    } else {
      ctx.body = fail(`用户名或密码错误，请重试. ${r}`)
    }
  }

  // http://localhost:3005/dang/userinfomodule/findAllUser
  @get('/findAllUser')
  async findAllUser(ctx: Context) {
    ctx.body = success(await UserDao.findAllUser())
  }

  @post('/addUser')
  async addUser(ctx: Context) {
    const userinfo: UserinfoRaw = ctx.request.body
    ctx.body = success(await UserinfoService.addUser(userinfo))
  }

  @post('/findByUsmAndPsw')
  async findByUsmAndPsw(ctx: Context) {
    const userinfo: UserinfoRaw = ctx.request.body
    ctx.body = success(await UserinfoService.findByUsmAndPsw(userinfo))
  }

  @get('/findByLike/:username')
  async findByLike(ctx: Context) {
    const { username } = ctx.params
    console.log('控制器username:', username)
    ctx.body = success(await UserinfoService.findByLike(username))
  }

  @get('/findByProps')
  async findByProps(ctx: Context) {
    ctx.body = success(await UserinfoService.findByProps())
  }

  @get('/countUserInfo')
  async countUserInfo(ctx: Context) {
    ctx.body = success(await UserinfoService.countUserInfo())
  }

  @get('/findUserWithPager')
  async findUserWithPager(ctx: Context) {
    console.log('控制器-分页:', ctx.query)
    const { pageNo = '1', pageSize = '1' } = ctx.query || {}
    const offset = (Number(pageNo) - 1) * Number(pageSize) || 0

    ctx.body = success(
      await UserinfoService.findUserWithPager({
        offset,
        pageSize: Number(pageSize),
      })
    )
  }
}
