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

  // 原生实现 -> 对应路由封装在 controller 层了。
  async findSecThrdCtgysSQL(firstctgyid: string) {
    const sql = `select * from secondctgy sec inner join thirdctgy tc on sec.secondctgyid = tc.secctgyid where sec.firstctgyid = ${firstctgyid}`
    // Promise<[unknown[], unknown]> // promise不完全是面向对象封装的，
    // 返回的数据在第一项里头
    const secThrCtgys: any[] = (await sequelize.query(sql))[0]
    // 弊端： 对数据格式需要额外转换
    // return secThrCtgys 高要求处理数据格式 ts难点
    /*
    实现步骤
    1 获取数组元素类型 /src/tstypes/one.ts
    2 获取指定key组成的数组
    3 /src/tstypes/two.ts
    4
    5
    6 
    7 构建combine对象 /src/tstypes/three.ts
    8 合成最终对象
    挑战：深度复杂难题： 把第八步写成一个通用convert方法，其他关联类也可以直接使用
    */
    return convert(secThrCtgys)
  }
 
  async findFirstCtgys() {
    return FirstCtgyModel.findAll({
      raw: true,
    })
  }
}

export default CtgyDao.ctgyDao
