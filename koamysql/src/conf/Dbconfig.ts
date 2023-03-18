// ts 类型守卫
// function isString(data: any): data is string {
//   return typeof data === 'string'
// }

interface DbConConf {
  host: string
  user: string
  password: string
  port: number
  database: string
}

// 环境
interface EnvConf {
  dev: DbConConf
  test: DbConConf
  prod: DbConConf
}

class Conf {
  static conf: Conf = new Conf()
  env!: keyof EnvConf
  envConf!: EnvConf
  constructor() {
    this.env = (process.env.NODE_ENV as keyof EnvConf) || 'dev';

    this.initConf()
  }
  initConf() {
    this.envConf = {
      dev: {
        host: 'localhost',
        user: 'root',
        password: '157351',
        database: 'dangdang',
        port: 3306,
      },
      test: {
        host: 'localhost',
        user: 'root',
        password: '157351',
        database: 'dangdang',
        port: 3306,
      },
      prod: {
        host: 'localhost',
        user: 'root',
        password: '157351',
        database: 'dangdang',
        port: 3306,
      },
    }
  }
  getConf(): DbConConf // 多个函数签名
  getConf(key: string): string
  getConf(key: any = ''): any { // 只有一个函数实现
    if (this.isDbConConfKeys(key) && key.length > 0) {
      return this.envConf[this.env][key]
    } else {
      // 获取整段配置
      return this.envConf[this.env]
    }
  }
  isDbConConfKeys(key: any): key is keyof DbConConf {
    return key === 'host' || key === 'user' || key === 'password' || key === 'database' || key === 'port'
  }
}

export default Conf.conf
