import CtgyDao from '../dao/CtgyDao'
import RedisUtil from '../../../common/RedisUtil'

class CtgyService {
  static ctgyService: CtgyService = new CtgyService()
  async findFirstCtgys() {
    // const firstCtgysRedis = 0;
    const firstCtgysRedis = 9;
    // const firstCtgysRedis = await RedisUtil.hget('firstCtgysHash', 'firstCtgys')
    console.log('firstCtgysRedis--:', firstCtgysRedis)
    if (!firstCtgysRedis) {
      // 首次 redis 没有数据
      console.log('enter MysqlDb')
      const firstCtgys = await CtgyDao.findFirstCtgys()
      console.log('firstCtgys--:', firstCtgys)
      RedisUtil.hset('firstCtgysHash', 'firstCtgys', firstCtgys)
      return firstCtgys
    } else {
      console.log('enter Redis Cache')
      return firstCtgysRedis
    }
  }
}
export default CtgyService.ctgyService
