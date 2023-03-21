import redisconfig, { RedisClient } from '../conf/Redisconfig'

/*
高内聚: 将所有情况统一封装在一起，调用的地方同时更新
低耦合： 哪个地方调用，仅仅对应做定制化处理，并且不会与其他无关的业务 受到影响
*/
// 统一封装redis异常，数据json化
class RedisUtil implements RedisClient {
  static redisUtil: RedisUtil = new RedisUtil()
  redisClient: RedisClient = redisconfig.redisServerConf()

  set(key: string, value: string) {
    throw new Error('Method not implemented.')
  }
  get(key: string) {
    throw new Error('Method not implemented.')
  }
  // 处理好了
  async hset(obj: string, key: string, value: any) {
    await this.redisClient.hset(obj, key, JSON.stringify(value))
  }
  // 处理好了
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
