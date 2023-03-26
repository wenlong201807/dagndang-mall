import { Column, Model, Table } from 'sequelize-typescript'

@Table({
  tableName: 'reply',
})
export default class Reply extends Model<Reply> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  public replyid!: number
  @Column
  public replycontent!: string
  @Column
  public replydate!: Date
  @Column
  public replyor!: string
  @Column
  public evalid!: number
}
