import { Column, Model, Table } from 'sequelize-typescript'

@Table({
  tableName: 'books',
})
export default class Books extends Model<Books> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  ISBN!: string
  @Column
  public bookname!: string
  @Column
  public author!: string
  @Column
  public publishid!: string
  @Column
  public publishername!: string
  @Column
  public monthsalecount!: number
  @Column
  public bookpicname!: string
  @Column
  public secondctgyid!: number
  @Column
  public thirdctgyid!: number
  @Column
  public originalprice!: number
  @Column
  public discount!: number
}
