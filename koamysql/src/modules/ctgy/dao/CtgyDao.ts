import { sequelize } from '../../../modules/BaseDao'
import { Op, Sequelize, Silent } from 'sequelize'
import convert from '../moduletypes'
import FirstCtgyModel from '../defmodel/firstctgy'
import findSecThrdCtgysByFstCtgyId from '../defmodel/OneToMany'

class CtgyDao {
  static ctgyDao: CtgyDao = new CtgyDao()

  // 一对多查询，同时将级联字段重改key名
  // 左外连接的应用
  async findSecThrdCtgys(firstctgyid: string) {
    return findSecThrdCtgysByFstCtgyId(parseInt(firstctgyid))
  }
  // async findSecThrdCtgys(firstctgyid: number) {
  //   const sql = `select * from secondctgy sec inner join thirdctgy tc on sec.secondctgyid = tc.secctgyid where sec.firstctgyid = ${firstctgyid}`
  //   const secThrCtgys: any[] = (await sequelize.query(sql))[0]
  //   return convert(secThrCtgys)
  // }
 
  async findFirstCtgys() {
    return FirstCtgyModel.findAll({
      raw: true,
    })
  }
}

export default CtgyDao.ctgyDao
