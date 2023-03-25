import { defineStore } from 'pinia'

import SearchApi from '@/api/searchApi'
import { AxiosResponse } from 'axios'

export interface  HistoryKeywordIF {
  historykeywordid: number
  clickcount: number
  historykeyword: string
}
export interface KeywordIF {
  keywordid: number
  keyword: string
}
export const searchStore =  defineStore('searchStore', {
  state: () => {
    return {
      keywordList: [] as KeywordIF[],
      historyKeywordList: [] as HistoryKeywordIF[],
      searchDiscoveryList: [] as HistoryKeywordIF[],
    }
  },
  getters: {
    keywordListGetter(state) {
      return state.keywordList
    },
    historykeywordListGetter(state) {
      return state.historyKeywordList
    },

  },
  actions: {
    async SearchKyewordsAction(key: string) {
      const keywordList: AxiosResponse<KeywordIF[]> = await SearchApi.searchKeywords(key)
      this.keywordList = keywordList.data
    },
    async AddOrUpdateHistoryKeywordAction(key: string) {
      const historyKeywordList: AxiosResponse<HistoryKeywordIF[]> = await SearchApi.searchKeywords(key)
      this.historyKeywordList = historyKeywordList.data
    },
  },
})
