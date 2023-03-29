import Koa from 'koa'
import fs from 'fs'
import body from 'koa-body'
import json from 'koa-json'
import Router from 'koa-router'
import globalException from './GlobalExce-new'
// import globalException from './GlobalExce'
import path from 'path'
import koajwt from 'koa-jwt'

class AllCtrlRouterLoader {
  app!: Koa
  static allRouterLoader = new AllCtrlRouterLoader()
  init(app: Koa) {
    this.app = app
    this.loadMiddleAware() // 加载中间件
    this.storeRootRouterToCtx() // 保存根路由
    this.loadAllCtrlRouterWrapper() // 加载控制器路由
    this.listen() // 监听
  }
  loadMiddleAware() {
    this.app.use(json()) // 接口数据json化
    this.app.use(body()) // body请求参数
    this.app.use(globalException) // 通用异常处理
    // 通用 鉴权
    this.app.use(koajwt({ secret: 'dragon' }).unless({
      // path:[/^\/dang\/userinfomodule\/login/]
      path: [
        /^\/dang\/heart/,
        /^\/dang\/userinfomodule\/login/,
        /^\/dang\/booksmodule/,
        /^\/dang\/searchmodule/,
        /^\/dang\/evaluatemodule/,
        /^\/dang\/replymodule/,
      ]
    }))
  }
  storeRootRouterToCtx() {
    /**
     * 为什么要保存跟路由：
     *    使用到控制器装饰器的时候，需要拿到全局路由
     */
    const rootRouter = new Router()
    // 路由前缀是怎么添加的注册路由里面的？
    rootRouter.prefix('/dang') // 为路由添加前缀

    // 心跳检测
    rootRouter.get('/heart', async (ctx) => {
      ctx.body = 'heart normal...'
    })

    // 将路由挂载到全局上下中，高内聚低耦合的应用场景之一
    // 刚好此方法在初始化时被调用一次。即可随时使用此上下文
    this.app.context.rootRouter = rootRouter
    this.app.use(rootRouter.routes())
  }
  loadAllCtrlRouterWrapper() {
    // 3.1 调用获取绝对路径数组方法
    const allFullFilePaths = this.getAbsoluteFilePaths()
    // 3.2 调用加载所有一级路由到二级路由方法
    this.loadAllRouter(allFullFilePaths)
  }
  /**
   * 1 加载所有路由文件数组
   * 2 加载所有路由文件绝对路径数组
   * 3 加载所有一级路由到二级路由中
   * @param allFullFilePaths
   */
  loadAllRouter(allFullFilePaths: string[]) {
    console.log('allFullFilePaths加载所有路由文件绝对路径数组', allFullFilePaths)

    for (const fullFilePath of allFullFilePaths) {
      // 这里使用了require 所有router模块要使用 CommonJs 规范 才能识别
      // 当执行require的时候会获取到控制器 就去自动去执行装饰器 把方法装饰器和类装饰器全部执行完成之后 路由和方法就执行捆绑了
      require(fullFilePath) // 对应模块导出方式必须是 module.exports = router
    }
  }
  //   2.加载所有路由文件绝对路由数组
  getAbsoluteFilePaths() {
    // process.cwd() 获取执行环境的根目录
    const dir = path.join(process.cwd(), '/src/controller')
    const allFiles = this.getFiles(dir)
    const allFullFilePaths: string[] = []
    for (let file of allFiles) {
      if (this.isCtrlFile(file)) {
        const fullFilePath = dir + '/' + file
        allFullFilePaths.push(fullFilePath)
      }
    }
    return allFullFilePaths
  }

  // 是不是控制器文件
  isCtrlFile(file: string) {
    const fileName: string = file.substring(file.lastIndexOf('\\') + 1, file.lastIndexOf('.'))
    const extendsionName: string = file.substring(file.lastIndexOf('.'), file.length)
    return fileName.indexOf('Controller') !== -1 && extendsionName === '.ts'
  }
  //   1.加载所有路由文件数组
  getFiles(dir: string) {
    return fs.readdirSync(dir)
  }
  listen() {
    let port: number = 3005
    const curEnv = process.env.NODE_ENV || 'prod'
    if (curEnv === 'dev') {
      port = 3005
    } else {
      port = 6012
    }
    this.app.listen(port)
    console.log(`dangdang_mall is listen ${port} server`)
  }
}

export default AllCtrlRouterLoader.allRouterLoader
