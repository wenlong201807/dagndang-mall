import 'reflect-metadata'
import AllCtrlRouterLoader from '../common/AllCtrlRouterLoader'
type MethodType = 'get' | 'post' | 'put' | 'delete'
const METHOD_METADATA = 'methodType'
const PATH_METADATA = 'path'

// 跟路由的？？ 路由前缀是怎么添加的注册路由里面的？

export function Controller(modulePath: string = '/') {
  // modulePath 指的是 router.prefix('/xxxx')
  function getFullPath(reqPath: string) {
    if (modulePath) {
      if (modulePath.length > 1) {
        if (!modulePath.startsWith('/')) {
          modulePath = `/${modulePath}`
        }
      } else if (modulePath === '/') {
        modulePath = ''
      }
    }
    return `${modulePath}${reqPath}`
  }
  return function (targetClass: { new(...args: any): any }) {
    console.log('路由封装-请求方法')
    // 1. 获取原型上的请求方法名
    const methodname = Object.keys(Object.getOwnPropertyDescriptors(targetClass.prototype)).filter((item) => item !== 'constructor')
    methodname.forEach((name) => {
      // 2. 根据方法名获取具体的方法体
      const routerHandlrFn = targetClass.prototype[name]

      // 3. 获取请求路径和请求类型，根路由对象
      const reqPath = Reflect.getMetadata(PATH_METADATA, targetClass.prototype, name)
      const fullReqPath = getFullPath(reqPath)
      const reqMethodType: MethodType = Reflect.getMetadata(METHOD_METADATA, targetClass.prototype, name)
      // 4. 实现路由请求
      const rootRouter = AllCtrlRouterLoader.app.context.rootRouter // 将路由注册到app的上下文中，核心的另一步骤

      if (fullReqPath && reqMethodType) {
        // console.log(reqMethodType, '路由封装-请求方法')

        // 核心的步骤，将路由添加到app中，通过中间件的方式注册
        // router.get('/findSecThrdCtgys/:firstctgyid', async (ctx) => {})
        rootRouter[reqMethodType](fullReqPath, routerHandlrFn)
      }
    })
  }
}
