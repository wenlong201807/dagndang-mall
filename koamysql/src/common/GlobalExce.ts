import Koa, { Context } from 'koa'
import { success, fail } from './ResResult'
import logger from './LogUtil'
const globalException = async (ctx: Context, next: Koa.Next) => {
  logger.info('进入到通用异常')
  try {
    await next()
    logger.info('进入到通用异常结束')
  } catch (err: any) {
    ctx.body = fail('服务器错误' + err.message)
  }
}

export default globalException
