import { DataTypes } from 'sequelize'
import { sequelize } from '../../BaseDao'
// 二级分类
class SecondCtgyModel {
  static createModel() {
    const model = sequelize.define(
      'secondctgy',
      {
        secondctgyid: {
          type: DataTypes.INTEGER,
          field: 'secondctgyid',
          primaryKey: true,
          autoIncrement: true,
        },
        secctgyname: {
          type: DataTypes.STRING(20),
          field: 'secctgyname',
          allowNull: false, // 是否为空
        },
        firstctgyId: {
          type: DataTypes.INTEGER,
          field: 'firstctgyId',
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

export const secondCtgyModel = SecondCtgyModel.createModel()
