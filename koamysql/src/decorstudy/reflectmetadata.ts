import 'reflect-metadata'
@Reflect.metadata('decribe', 'world People')
class People {
  @Reflect.metadata('decribe', 'The name cannot contain illegal Han z')
  username = 'wangwu'

  @Reflect.metadata('importinfo', 'eat KFC ?')
  eat() {}
}

console.log(Reflect.getOwnMetadata('decribe', People))
console.log(Reflect.getOwnMetadata('decribe', People.prototype, 'username'))
console.log(Reflect.getOwnMetadata('importinfo', People.prototype, 'eat'))
