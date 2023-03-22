import request from '../utils/axiosUtil'

// 使用类的方式编辑接口
class CtgyAPI {
  static api: CtgyAPI = new CtgyAPI()
  getFirstCtgyList() {
    return request.get('/ctgymodule/findFirstCtgys', false)
  }
  getSecThrdCtgyList(firstCtgysId: number) {
    return request.get(`/ctgymodule/findSecThrdCtgys/${firstCtgysId}`, false)
  }
}

CtgyAPI.api.getFirstCtgyList()
export default CtgyAPI.api
