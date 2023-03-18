import redisconfig, { RedisClient } from '../conf/Redisconfig'

class RedisUtil implements RedisClient {
  static redisUtil: RedisUtil = new RedisUtil()
  redisClient: RedisClient = redisconfig.redisServerConf()

  set(key: string, value: string) {
    throw new Error('Method not implemented.')
  }
  get(key: string) {
    throw new Error('Method not implemented.')
  }
  async hset(obj: string, key: string, value: any) {
    await this.redisClient.hset(obj, key, JSON.stringify(value))
  }
  async hget(obj: string, key: string) {
    const value = await this.redisClient.hget(obj, key)
    return value ? JSON.parse(value) : undefined
  }
  hmset(obj: string, ...keyvalues: any[]) {
    throw new Error('Method not implemented.')
  }
  hgetall(obj: string) {
    throw new Error('Method not implemented.')
  }
  hmget(obj: string, ...key: any[]) {
    throw new Error('Method not implemented.')
  }
}

export default RedisUtil.redisUtil
