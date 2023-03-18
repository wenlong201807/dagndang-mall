import { DataTypes } from 'sequelize'
import { sequelize } from '../../BaseDao'

class BookModel {
  static createModel() {
    const model = sequelize.define(
      'firstctgy',
      {
        firstCtgyId: {
          type: DataTypes.INTEGER,
          field: 'firstCtgyId',
          primaryKey: true,
          autoIncrement: true,
        },
        firstctgyname: {
          type: DataTypes.STRING(30),
          field: 'firstctgyname',
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

export default BookModel.createModel()
