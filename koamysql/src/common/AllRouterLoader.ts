import path from 'path'
import fs from 'fs'
import Router from 'koa-router'
import Koa, { Context } from 'koa'
import body from 'koa-body'
import json from 'koa-json'
import globalException from './GlobalExce'

/**
 * 第一个中间件执行输出开始 next 跳转到第二个中间件输出开始，随后第二个中间件 next ,但是已经没有中间件了 就直接跳到路由器。路由器本质上也算是一个中间件
 * 路由器执行所有代码，由于路由器没有next就全部执行完毕，但执行完并没有结束。就会回头，但是倒着走，先从路由器回到第二个中间件，所有第二个中间件输出结束
 * 跟着第一个中间件也就输出结束
 */
// const middleware1 = async (ctx: Context, next: Koa.Next) => {
//   console.log('第一个中间件开始')
//   await next() // 表示访问下一个中间件
//   console.log('第一个中间件结束')
// }
// const middleware2 = async (ctx: Context, next: Koa.Next) => {
//   console.log('第二个中间件开始')
//   await next()
//   console.log('第二个中间件结束')
// }

class AllRouterLoader {
  app!: Koa
  // 初始化
  static allRouterLoader: AllRouterLoader = new AllRouterLoader() // 保证对象唯一
  init(app: Koa) {
    this.app = app
    const rootRouter = this.loadAllRouterWrapper()
    // this.app.use(middleware1)
    this.app.use(globalException)
    this.app.use(rootRouter.routes())
    // 4.监听方法
    this.listen()
  }
  //   1.加载所有路由文件数组
  getFiles(dir: string) {
    return fs.readdirSync(dir)
  }
  //   2.加载所有路由文件绝对路由数组
  getAbsoluteFilePaths() {
    const dir = path.join(process.cwd(), '/src/router')
    const allFiles = this.getFiles(dir)
    const allFullFilePaths: string[] = []
    for (let file of allFiles) {
      const fullFilePath = dir + '\\' + file
      allFullFilePaths.push(fullFilePath)
    }
    return allFullFilePaths
  }
  isRouter(data: any): data is Router {
    return data instanceof Router
  }
  //   3.加载所有一级路由到二级路由中
  loadAllRouterWrapper() {
    // 3.0 获取一级路由
    const rootRouter = this.getRootRouter()
    // 3.1 调用获取绝对路径数组方法
    const allFullFilePaths = this.getAbsoluteFilePaths()
    // 3.2 调用加载所有一级路由到二级路由方法
    this.loadAllRouter(allFullFilePaths, rootRouter)
    return rootRouter
  }
  // 获取一级路由
  getRootRouter() {
    const rootRouter = new Router()
    rootRouter.prefix('/dang') // 为路由添加前缀
    this.app.use(json())
    this.app.use(body())
    return rootRouter
  }
  loadAllRouter(allFullFilePaths: string[], rootRouter: Router) {
    for (const fullFilePath of allFullFilePaths) {
      // 这里使用了require 所有router模块要使用 CommonJs 规范 才能识别
      const module = require(fullFilePath)
      // 判断是否为router模块
      if (this.isRouter(module)) {
        rootRouter.use(module.routes(), module.allowedMethods())
      }
    }
  }
  listen() {
    this.app.listen(3005)
    console.log('listen 3005 server')
  }
}
export default AllRouterLoader.allRouterLoader
