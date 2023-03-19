// 方法装饰器
import 'reflect-metadata'
let test: any = null
function addDecorator(
  targetClass: any,
  key: string,
  descriptor: PropertyDescriptor
) {
  Reflect.defineMetadata('path', key, targetClass)
  console.log(10, Reflect.getMetadata('path', targetClass))
  // 执行被装饰器修饰的方法
  // descriptor.value() // 指向原函数，相当于调用原函数
}

// 如果是带参数的装饰器，则在外面包裹一个函数，返回装饰器函数，参考类装饰器

function Controller() {
  return function (targetClass: { new (...args: any): any }) {
    console.log(16, Reflect.getMetadata('path', targetClass.prototype))
  }
}

@Controller()
class Car {
  name = '124124'
  @addDecorator
  run() {
    console.log('run')
  }
}
export {}
