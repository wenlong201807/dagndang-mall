import { DataTypes } from 'sequelize'
import { sequelize } from '../../BaseDao'
// 三级分类
class ThirdCtgyModel {
  static createModel() {
    const model = sequelize.define(
      'thirdctgy',
      {
        thirdctgyid: {
          type: DataTypes.INTEGER,
          field: 'thirdctgyid',
          primaryKey: true,
          autoIncrement: true,
        },
        thirdctgyname: { // thirdctgyname
          type: DataTypes.STRING(20),
          field: 'thirdctgyname', // 不能有空格
          allowNull: false, // 是否为空
        },
        secctgyid: {
          type: DataTypes.INTEGER,
          field: 'secctgyid',
          allowNull: false,
        },
      },
      {
        timestamps: false, // true 表示给模型加上时间属性(createAt, updateAt), false 表示不带时间戳属性
      }
    )
    return model
  }
}

export const thirdCtgyModel = ThirdCtgyModel.createModel()
