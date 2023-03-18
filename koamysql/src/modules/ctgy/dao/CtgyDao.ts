import { sequelize } from '../../../modules/BaseDao'
import { Op, Sequelize, Silent } from 'sequelize'
import convert from '../moduletypes'
import FirstCtgyModel from '../defmodel/firstctgy'

class CtgyDao {
  static ctgyDao: CtgyDao = new CtgyDao()

  async findSecThrdCtgys(firstctgyid: number) {
    const sql = `select * from secondctgy sec inner join thirdctgy tc on sec.secondctgyid = tc.secctgyid where sec.firstctgyid = ${firstctgyid}`
    const secThrCtgys: any[] = (await sequelize.query(sql))[0]
    return convert(secThrCtgys)
  }
 
  async findFirstCtgys() {
    return FirstCtgyModel.findAll({
      raw: true,
    })
  }
}

export default CtgyDao.ctgyDao
