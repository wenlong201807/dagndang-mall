import 'reflect-metadata'
export function reqProccess(methodType: string) {
  /**
   * 这里的请求路径 或者get post put delete 请求一定要保存下来，以便后面的类装饰器可以获取其数据
   * 最终捆绑到路由上，页面才可以访问路由请求
   */
  return function (reqPath: string) {
    return function (
      targetClassPrototype: any,
      methodname: string,
      methodDecri: PropertyDescriptor
    ) {
      /**
       * 假如使用 map 来保存, 但是 map 地址相同的时候会出现覆盖，不可能为每一个请求都准备一个key,那是不现实的
       * 使用 reflect-metadata ：可以特定的将数据捆绑到特定原型对象方法上，由于每一个原型和方法名组合的都不会重复
       * 所以最终从取出来的元数据也不会重复
       */
      Reflect.defineMetadata('path', reqPath, targetClassPrototype, methodname)
      Reflect.defineMetadata(
        'methodType',
        methodType,
        targetClassPrototype,
        methodname
      )
    }
  }
}

const get = reqProccess('get')
const post = reqProccess('post')
const put = reqProccess('put')
const del = reqProccess('delete')

export { get, post, put, del }
