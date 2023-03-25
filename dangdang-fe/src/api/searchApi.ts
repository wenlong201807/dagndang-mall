import request from '@/utils/axiosUtil'
class SearchAPI {
  static api: SearchAPI = new SearchAPI()

  searchKeywords(key: string) {
    return request.get(`/searchmodule/searchKeywords/${key}`, false)
  }
  addOrUpdateHistoryKeyword(historykeyword: string) {
    return request.post(`/searchmodule/addOrUpdateHistoryKeyword`, false, { historykeyword })
  }
}

export default SearchAPI.api
