import { sequelize } from '../../modules/BaseDao'
import { Op, Sequelize, Silent } from 'sequelize'
import { ReplyRaw } from "./ReplyRaw";

// import Reply from '../decormodel/reply'

class ReplyDao {
  static replyDao: ReplyDao = new ReplyDao()

  async findEvalReplyList(reply: ReplyRaw) {
    const {replycontent, replydate, evalid, replyor} = reply
    const sqlOuter = `insert into reply(replycontent, replydate, evalid, replyor) values('${replycontent}', '${replydate}', '${evalid}', '${replyor}')`

    return await sequelize.query(sqlOuter)
  }

}

export default ReplyDao.replyDao