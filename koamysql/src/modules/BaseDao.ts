import path from 'path'
import dbconfig from '../conf/Dbconfig'
import { Sequelize } from 'sequelize-typescript'
import { Dialect } from 'sequelize'

class BaseDao {
  static baseDao: BaseDao = new BaseDao()
  sequelize!: Sequelize
  constructor() {
    console.log('initSeqConf--连接数据库成功')
    this.initSeqConf('mysql')
  }
  initSeqConf(dialect: Dialect) {
    //创建sequelize对象,参数分别为: 数据库名称，数据库类型，密码，配置
    let { host, user, password, port, database } = dbconfig.getConf()
    this.sequelize = new Sequelize(database, user, password, {
      host,
      port,
      dialect, // 表示是何种数据库
      define: { timestamps: false, freezeTableName: true }, // 对数据库所有表都有控制权限
      pool: {
        // 数据库连接池
        max: 10, // 最大连接对象的个数
        // 最小连接数
        min: 5,
        // idle 这个属性控制连接池中中空闲连接的最大空闲时间，单位为毫秒。只有当连接池中连接数量大于最小连接数量时会生效
        idle: 10000,
        // 表示一条 sql 查询在获取连接资源之前最长等待时间，单位 秒
        acquire: 100000, // 对应查询超时，和这里的时间大小有关
      },
    })
  }
  // 将所有model加载到this.sequelize 实例中
  addModels() {
    const modelPath = path.join(process.cwd(), '/src/modules/decormodel')
    this.sequelize.addModels([modelPath])
  }
}

const baseDao = BaseDao.baseDao
baseDao.addModels()

export const { sequelize } = BaseDao.baseDao
