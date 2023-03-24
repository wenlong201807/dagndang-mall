// 首页 业务层

// import { ref, watchEffect } from 'vue'

import bookStore from '@/piniastore/book'
import { storeToRefs } from 'pinia'
import { trimStr } from '@/utils/stingUtil'

export class HomeClass {
  static store = bookStore()
  static storeToRefs = storeToRefs(HomeClass.store)
  static async findBookWithPagerService() {
    await HomeClass.store.findBookWithPagerAction()
  }
  static isLastPageService() {
    return HomeClass.store.isLastPageGetter
  }
}

export { trimStr }
