import request from '@/utils/axiosUtil'

export type Userinfo = {
  userid: number
  token: string
  username: string
  psw: string
  address: string
  birth: string
  valid: number
}
class UserinfoAPI {
  static api: UserinfoAPI = new UserinfoAPI()

  login(userinfo: Userinfo) {
    return request.get(`/userinfomodule/login`, false, userinfo)
  }
}

export default UserinfoAPI.api
