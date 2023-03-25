import { Column, Model, Table } from 'sequelize-typescript'

@Table({
  tableName: 'historykeyword',
})
export default class Historykeyword extends Model<Historykeyword> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  historykeywordid!: number
  @Column
  historykeyword!: string
  @Column
  clickcount!: number
}