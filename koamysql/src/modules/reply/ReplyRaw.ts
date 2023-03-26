import Reply from '../decormodel/reply'
type ReplyRawKeys = 'replycontent' | 'replydate' | 'evalid' | 'replyor'
export type ReplyRaw = Pick<Reply, ReplyRawKeys>
