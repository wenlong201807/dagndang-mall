import { ref, watchEffect } from 'vue'

import { searchStore } from '@/piniastore/search/index'
import { storeToRefs } from 'pinia'
import router from '@/router'


export class SearchServiceClass {
  // 必须放在函数或者class内部
  static store = searchStore()

  // 响应式的store只能用于 state，getters中
  // 返回响应式store数据
  static storeRefs = storeToRefs(SearchServiceClass.store)
  static keyword = ref<string>('')

  static async searchKeywordsService() {
    const key = SearchServiceClass.keyword.value
    await SearchServiceClass.store.SearchKyewordsAction(key)
    console.log('获取关键字列表：', SearchServiceClass.store.keywordListGetter)
  }
}

