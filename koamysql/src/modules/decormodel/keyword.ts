import { Column, Model, Table } from 'sequelize-typescript'

@Table({
  tableName: 'keyword',
})
export default class Keyword extends Model<Keyword> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  keywordid!: number
  @Column
  keyword!: string
}