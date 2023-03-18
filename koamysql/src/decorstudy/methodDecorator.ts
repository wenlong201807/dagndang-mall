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
}

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
