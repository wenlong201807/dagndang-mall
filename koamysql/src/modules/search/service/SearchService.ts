import SearchDao from '../dao/SearchDao'
// import RedisUtil from '../../../common/RedisUtil'
import Historykeyword from '../../decormodel/historykeyword'

class SearchService {
  static searchService: SearchService = new SearchService()

  async addOrUpdateHistoryKeyword(historykeyword: string) {
    const dbHistorykeyword = await SearchDao.searchHistorykeywords(historykeyword)
    if (dbHistorykeyword) {
      const result: [{affectedRows: number}, any] = await SearchDao.updateHistoryKeywords(historykeyword)
      // console.log('---:', result)
      /** result
        [
          ResultSetHeader {
            fieldCount: 0,
            affectedRows: 1,
            insertId: 0,
            info: 'Rows matched: 1  Changed: 1  Warnings: 0',
            serverStatus: 34,
            warningStatus: 0,
            changedRows: 1
          },
          ResultSetHeader {
            fieldCount: 0,
            affectedRows: 1,
            insertId: 0,
            info: 'Rows matched: 1  Changed: 1  Warnings: 0',
            serverStatus: 34,
            warningStatus: 0,
            changedRows: 1
          }
        ]
       */
      return result[0].affectedRows
    } else {
      const result: [number, number] = await SearchDao.saveHistoryKeywords(historykeyword)
      // console.log('---44:', result)
      // result = [ 19, 1 ] // 添加成功后，第一项是 新的主键id序列号值，第二个是 新增一条记录
      return result[0]
    }
  }

  async searchKeywords(key: string) {
    return await SearchDao.searchKeywords(key)
  }

  async searchDiscovery() {
    return await SearchDao.searchDiscovery()
  }
}
export default SearchService.searchService
