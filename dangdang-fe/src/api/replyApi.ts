import request from '@/utils/axiosUtil'

type ReplyIF = {
  replycontent: string
  replydate: string
  evalid: number
  replyor: string
}

class ReplyAPI {
  static api: ReplyAPI = new ReplyAPI()

  addReply(reply: ReplyIF) {
    return request.post(`/replymodule/addReply`, false, reply)
  }
}

export default ReplyAPI.api
