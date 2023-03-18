import Router from 'koa-router'

import { success } from '../common/ResResult'
import ctgyDao from '../modules/ctgy/dao/CtgyDao'

const router = new Router()

router.prefix('/ctgymodule')
router.get('/findSecThrdCtgys/:firstctgyid', async (ctx) => {
  const { firstctgyid } = ctx.params
  const result = await ctgyDao.findSecThrdCtgys(parseInt(firstctgyid))
  ctx.body = success(result)
})
module.exports = router
