import CtgyDao from '../dao/CtgyDao'
import RedisUtil from '../../../common/RedisUtil'

class CtgyService {
  static ctgyService: CtgyService = new CtgyService()
  async findFirstCtgys() {
    const firstCtgysRedis = await RedisUtil.hget('firstCtgysHash', 'firstCtgys')

    if (!firstCtgysRedis) {
      // 首次 redis 没有数据
      console.log('数据库 中获取一级分类')
      const firstCtgys = await CtgyDao.findFirstCtgys()
      // console.log('firstCtgys--:', firstCtgys)
      RedisUtil.hset('firstCtgysHash', 'firstCtgys', firstCtgys)
      return firstCtgys
    } else {
      console.log('redis 中获取一级分类')
      return firstCtgysRedis
    }
  }
}
export default CtgyService.ctgyService
