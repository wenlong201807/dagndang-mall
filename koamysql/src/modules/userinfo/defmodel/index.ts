import { DataTypes } from 'sequelize'
import { sequelize } from '../../BaseDao'

class Userinfo {
  static createModel() {
    const model = sequelize.define(
      'userinfo',
      {
        userid: {
          type: DataTypes.INTEGER,
          field: 'userid', // 对应关系
          primaryKey: true, // 是否主键
          autoIncrement: true, // 是否自动增长
        },
        username: {
          type: DataTypes.STRING(30),
          field: 'username',
          allowNull: false, // 是否为空
        },
        psw: {
          type: DataTypes.STRING(11),
          field: 'psw',
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING,
          field: 'address',
          allowNull: false,
        },
        valid: {
          type: DataTypes.STRING,
          field: 'valid',
          allowNull: false,
        },
        birth: {
          type: DataTypes.DATE,
          field: 'birth',
        },
      },
      {
        // freezeTableName: true, // true 表示使用给定的表名, false 表示模型名后加s作为表明
        timestamps: false, // true 表示给模型加上时间属性(createAt, updateAt), false 表示不带时间戳属性
      }
    )
    // 同步数据库，force 的值为true，表若存在则先删除后创建，值为false是，表不存在才会创建
    // model.sync({ force: false })

    return model
  }
}

export const model = Userinfo.createModel()
