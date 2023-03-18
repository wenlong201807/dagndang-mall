import 'reflect-metadata'
// 1 obj
let obj = {
  username: 'roles',
  age: 3,
  info() {
    console.log('test')
  },
}

Reflect.defineMetadata('mateobjkey', 'my obj Metadata', obj)
Reflect.defineMetadata('mateobjkey', 'my obj Metadata', obj)
console.log(Reflect.getMetadata('mateobjkey', obj))

// 在对象属性上定义和获取元数据
Reflect.defineMetadata('usernamemetakey', 'username legal', obj, 'username')
console.log(Reflect.getMetadata('usernamemetakey', obj, 'username'))
