import { Column, Model, Table } from 'sequelize-typescript'
import { DataTypes } from 'sequelize'

// 未使用的文件
@Table({
  tableName: 'userinfo',
})
export default class UserinfoModel extends Model<UserinfoModel> {
  @Column({
    type: DataTypes.INTEGER,
    field: 'userid',
    primaryKey: true,
    autoIncrement: true,
  })
  userid!: number
  @Column({
    type: DataTypes.STRING(30),
    field: 'username',
    allowNull: false, // 是否为空
  })
  public username!: string
  @Column({
    type: DataTypes.STRING(11),
    field: 'psw',
    allowNull: false, // 是否为空
  })
  psw!: string
  @Column({
    type: DataTypes.STRING(20),
    field: 'address',
    allowNull: false, // 是否为空
  })
  address!: string
  @Column({
    type: DataTypes.TINYINT,
    field: 'valid',
    allowNull: false,
  })
  valid!: string
  @Column({
    type: DataTypes.DATE,
    field: 'birth',
  })
  birth!: Date

  // 额外添加字段，不是表中的字段
  token!: string
}
