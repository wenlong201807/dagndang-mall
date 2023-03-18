import Redis from 'koa-redis'

interface DbConConf {
  host: string
  port: number
}

interface EnvConf {
  dev: DbConConf
  pord: DbConConf
}

export interface RedisClient {
  set(key: string, value: string): any
  get(key: string): any
  hset(obj: string, key: string, value: string): any
  hget(obj: string, key: string): any
  hmset(obj: string, ...keyvalues: any[]): any
  hgetall(obj: string): any
  hmget(ojb: string, ...key: any[]): any
}

class RedisConfig {
  static conf: RedisConfig = new RedisConfig()
  envConf!: EnvConf
  env!: keyof EnvConf
  constructor() {
    // const curEnv = process.env.NODE_ENV || 'dev'
    this.env = process.env.NODE_ENV === 'dev' ? 'dev' : 'pord'
    this.initConf()
    this.redisServerConf()
  }

  initConf() {
    this.envConf = {
      dev: {
        host: '127.0.0.1',
        port: 6379,
      },
      pord: {
        host: '127.0.0.1',
        port: 6379,
      },
    }
  }

  getConf() {
    return this.envConf[this.env]
  }

  redisServerConf() {
    console.log('redisServerConf---')
    // const redisClient: RedisClient = redis({
    //   host: '127.0.0.1',
    //   port: 6379,
    // }).client
    return Redis(this.getConf()).client
  }
}

export default RedisConfig.conf
