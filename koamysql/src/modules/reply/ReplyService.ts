import { ReplyRaw } from './ReplyRaw'
import ReplyDao from './ReplyDao'
import { combine } from '../commontypes'

class ReplyService {
  static replyService: ReplyService = new ReplyService()
  async addReply(reply: ReplyRaw) {
    const dbReply = await ReplyDao.findEvalReplyList(reply)
    const lastNewReply = combine({ replyid: dbReply[0] }, reply)
    return lastNewReply
  }
}

export default ReplyService.replyService
