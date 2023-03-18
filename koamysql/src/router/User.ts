import Router from 'koa-router'
import { Context } from 'koa'
import { success, fail } from '../common/ResResult'
// import userDao from '../dao/UserDao'
import userDao, { Userinfo } from '../modules/userinfo/dao/UserDao'

const router = new Router()

router.prefix('/usermodule') // 为路由添加前缀

router.get('/findUserinfo/:username/:psw', async (ctx: Context) => {
  const { username, psw } = ctx.params
  // logger.debug('执行路由请求findUserinfo开始')
  // const userinfos = await userDao.findUserinfo(username, psw)
  // console.log(userinfos)
  // ctx.body = success(`hello ${username}`)

  ctx.body = success(await userDao.findByUsmAndPsw(username, psw))
})
// http://localhost:3005/dang/usermodule/findUser
router.get('/findUser', async (ctx: Context) => {
  const dbUserinfo = await userDao.findAllUser()
  console.log('dbUserinfo', dbUserinfo)
  ctx.body = success(dbUserinfo)
})

router.get('/findByProps', async (ctx: Context) => {
  ctx.body = success(await userDao.findByProps())
  console.log(ctx.body)
})

router.get('/findByLike/:key', async (ctx: Context) => {
  const { key } = ctx.params
  console.log(key)
  ctx.body = success(await userDao.findByLike(key))
})
router.get('/findByUsmAndAddr/:username/:psw', async (ctx: Context) => {
  const { username, psw } = ctx.params
  ctx.body = success(await userDao.findByUsmAndAddr(username, psw))
})

router.get('/findByLikeWithOrm/:key', async (ctx: Context) => {
  const { key } = ctx.params
  ctx.body = success(await userDao.findByLike(key))
})

router.get('/countTotal', async (ctx: Context) => {
  ctx.body = success(await userDao.countUserInfo())
})

router.get('/findUserWithPager/:pageNo/:pageSize', async (ctx: Context) => {
  const { pageNo, pageSize } = ctx.params
  const offset = (pageNo - 1) * pageSize
  ctx.body = success(
    await userDao.findUserWithPager(offset, parseInt(pageSize))
  )
})

router.post('/addUser', async (ctx: Context) => {
  const userinfo: Userinfo = ctx.request.body
  console.log('addUser-userinfo:', userinfo)
  const dbUserinfo = await userDao.addUser(userinfo)
  ctx.body = success(dbUserinfo)
})

module.exports = router
