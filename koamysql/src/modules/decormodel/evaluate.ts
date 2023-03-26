import { Column, Model, Table } from 'sequelize-typescript'

type Reply = {
  replyid: number
  replycontent: string
  replydate: Date
  replyor: string
  evalid: number
}

@Table({
  tableName: 'evaluate',
})
export default class Evaluate extends Model<Evaluate> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  public evaluateid!: number
  @Column
  public content!: string
  @Column
  public ISBN!: string
  @Column
  public evaluator!: string
  @Column
  public headportrait!: string
  @Column
  public givealikenum!: string
  @Column
  public evaluatedegree!: number
  @Column
  public pubdate!: Date
  @Column
  public isanonymous!: number

  replyid!: number
  replycontent!: string
  replydate!: Date
  replyor!: string
  evalid!: number
  replyLst!: Pick<Reply, 'replyid' | 'replycontent' | 'replydate' | 'replyor' | 'evalid'>
}
