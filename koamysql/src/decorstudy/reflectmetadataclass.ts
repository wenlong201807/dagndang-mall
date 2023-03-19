import 'reflect-metadata'
// 1 obj
let obj = {
  username: 'roles',
  age: 3,
  info() {
    console.log('test')
  },
}

// 将数据存储到对象上，以mateobjkey 为key ，my obj Metadata 为值
Reflect.defineMetadata('mateobjkey', 'my obj Metadata', obj)
Reflect.defineMetadata('mateobjkey', 'my obj Metadata', obj)
// 取出存储的元数据内容
console.log(Reflect.getMetadata('mateobjkey', obj))

// 在对象属性上定义和获取元数据 'username'
Reflect.defineMetadata('usernamemetakey', 'username legal', obj, 'username')
console.log(Reflect.getMetadata('usernamemetakey', obj, 'username'))
