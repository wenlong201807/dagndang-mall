import { Column, Model, Table } from 'sequelize-typescript'

@Table({
  tableName: 'shopcart',
})
export default class ShopCart extends Model<ShopCart> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  shopcartid!: string
  @Column
  public bookisbn!: string
  @Column
  public bookname!: string
  @Column
  public bookpicname!: string
  @Column
  public bookprice!: number
  @Column
  public userid!: number
  @Column
  public purcharsenum!: number
}
