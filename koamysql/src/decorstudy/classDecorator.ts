function firstDecorator(targetClass: any) { // 默认参数
  const targetClassInstance = new targetClass()
  targetClassInstance.buy()
  targetClassInstance.placeOrder()
  console.log('第一个 Decorator')
}
function firstDecorator2(targetClass: any) {
  const targetClassInstance = new targetClass()
  targetClassInstance.buy()
  targetClassInstance.placeOrder()
  console.log('第二个 Decorator')
}
firstDecorator
firstDecorator2

@firstDecorator2
@firstDecorator
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
