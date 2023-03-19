function firstDecoratorWrapper(params: string) { // 可传参数的，多加了一层包裹
  return function firstDecorator(targetClass: any) { // 这个才是真的装饰器
    const targetClassInstance = new targetClass()
    console.log('第一个 Decorator', params)
  }
}

@firstDecoratorWrapper('aa') // 如果多个装饰器同时装饰一个类，执行顺序如何？怎么写？
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
