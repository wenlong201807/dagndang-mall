import 'reflect-metadata'

// 将元数据信息 存储到一个类上
@Reflect.metadata('decribe', 'world People')
class People {

  // 将元数据信息 存储到一个类的属性上
  @Reflect.metadata('decribe', 'The name cannot contain illegal Han z')
  username = 'wangwu'

  // 将元数据信息 存储到一个类的方法上
  @Reflect.metadata('importinfo', 'eat KFC ?')
  eat() {}
}

console.log(Reflect.getOwnMetadata('decribe', People))
console.log(Reflect.getOwnMetadata('decribe', People.prototype, 'username'))
console.log(Reflect.getOwnMetadata('importinfo', People.prototype, 'eat'))
