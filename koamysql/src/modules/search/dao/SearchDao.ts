import { sequelize } from '../../../modules/BaseDao'
import { Op, Sequelize, Silent } from 'sequelize'

import Keyword from '../../decormodel/keyword'
import Historykeyword from '../../decormodel/historykeyword'

class SearchDao {
  static searchDao: SearchDao = new SearchDao()
  // 根据输入的关键字查询搜索关键字的列表
  searchKeywords(key: string) {
    return Keyword.findAll({
      raw: true,
      where: {
        keyword: {
          [Op.like]: `%${key}%`, // 模糊查询
        },
      },
    })
  }

  // 根据输入的关键字查询搜索关键字的列表
  searchHistorykeywords(key: string) {
    return Historykeyword.findOne({
      raw: true,
      where: {
        historykeyword: {
          [Op.like]: `${key}`, // 精确查询
        },
      },
    })
  }

  // 保存历史关键字方法 【第一次添加到 历史关键字表中】
  saveHistoryKeywords(historykeyword: string): Promise<[any, any]> {
    const sql = `insert into historykeyword(historykeyword, clickcount) values('${historykeyword}', 1)`
    return sequelize.query(sql)
  }

  // 更新历史关键字 点击次数【每次增加1】
  updateHistoryKeywords(historykeyword: string): Promise<[any, any]> {
    const sql = `update historykeyword set  clickcount=clickcount+1 where historykeyword='${historykeyword}'`
    return sequelize.query(sql)
  }

  // 搜索发现 查询 历史关键字表 排名前6的
  // select * from historykeyword order by clickcount desc LIMIT 0, 6;
  searchDiscovery() {
    return Historykeyword.findAll({
      raw: true,
      order: [['clickcount', 'desc']],
      offset: 0,
      limit: 6,
    })
  }
}

export default SearchDao.searchDao
