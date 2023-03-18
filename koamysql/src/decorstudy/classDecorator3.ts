function firstDecoratorWrapper(params: string) {
  return function firstDecorator(targetClass: { new (...args: any): any }) {
    const targetClassInstance = new targetClass()
    Object.keys(targetClass.prototype).forEach(methodname => {
      console.log(methodname)
    })
    // console.log('第一个 Decorator', params)
  }
}

@firstDecoratorWrapper('aa')
class CustomerService {
  name: string = '下单'
  constructor() {
    console.log('装饰器执行了构造函数')
  }
  buy() {
    console.log(this.name + '购买')
  }
  placeOrder() {
    console.log(this.name + '下单')
  }
}

export {}
