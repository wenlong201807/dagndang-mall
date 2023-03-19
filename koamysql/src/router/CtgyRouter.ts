import Router from 'koa-router'

import { success } from '../common/ResResult'
import ctgyDao from '../modules/ctgy/dao/CtgyDao'
// 基础班路由配置，不生效。
// 生效的路由封装到了 controller层
const router = new Router()

router.prefix('/ctgymodule')

// koa框架，结合sequlize 功能实现三表关联级联查询
router.get('/findSecThrdCtgys/:firstctgyid', async (ctx) => {
  const { firstctgyid } = ctx.params
  const result = await ctgyDao.findSecThrdCtgys(firstctgyid)
  ctx.body = success(result)
})
// 原生实现
router.get('/findSecThrdCtgysSQL/:firstctgyid', async (ctx) => {
  const { firstctgyid } = ctx.params
  console.log(77, firstctgyid)
  const result = await ctgyDao.findSecThrdCtgysSQL(firstctgyid)
  ctx.body = success(result)
})
module.exports = router
