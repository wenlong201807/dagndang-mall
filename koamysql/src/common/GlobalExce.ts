import Koa, { Context } from 'koa'
import { success, fail } from './ResResult'
import logger from './LogUtil'
const globalException = async (ctx: Context, next: Koa.Next) => {
  // logger.info('进入到通用异常-组件-无错误')
  try {
    await next()
    // logger.info('进入到通用异常结束')
  } catch (err: any) {
    switch (err.name) {
      case 'JsonWebTokenError':
        ctx.body = fail('这是一个不合法的 token')
        break
      case 'TokenExpiredError':
        ctx.body = fail('已经过期的 token')
        break
      default:
        ctx.body = fail('服务器错误' + err.message + '---' + err.name)
    }

    logger.warn('服务器错误' + err.message + '---' + err.name)
  }
}

export default globalException
