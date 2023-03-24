import Koa, { Context } from 'koa'
import { success, fail } from './ResResult'
import logger from './LogUtil'

const globalException = async (ctx: Context, next: Koa.Next) => {
  await next().catch((err) => {
    if (err.status === 401) {
      ctx.body = fail('这是一个不合法的 token')
    } else {
      fail('服务器错误' + err.message + '---' + err.name)
    }
  })
}

export default globalException
