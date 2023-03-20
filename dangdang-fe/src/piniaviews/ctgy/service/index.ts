import { ref, watchEffect } from 'vue'
import { SecondCtgy, FirstCtgy } from '@/store/state'
import { ctgyStore } from '@/piniastore/ctgy/index'
import { storeToRefs } from 'pinia'
import router from '@/router'
import { ThirdCtgy } from '@/piniastore/ctgy/state'

class FstToThrdCtgy {
  static store = ctgyStore()
  static storeRefs = storeToRefs(FstToThrdCtgy.store)
  static firstCtgyActiveIndex = ref<number>(0)

  static async getFirstCtgys() {
    await FstToThrdCtgy.store.findFirstCtgyList()
    FstToThrdCtgy.firstCtgyActiveIndex.value = 1
    FstToThrdCtgy.storeFirstCtgy()
  }

  static storeFirstCtgy() {
    const firstCtgy = FstToThrdCtgy.store.firstCtgyList.find((firstCtgy) => {
      return firstCtgy.firstCtgyId === FstToThrdCtgy.firstCtgyActiveIndex.value
    })!
    FstToThrdCtgy.store.storeFirstCtgy(firstCtgy)
  }

  // 一级分类，切换选中标签
  static changeTab(firstCtgy_: FirstCtgy) {
    if (FstToThrdCtgy.firstCtgyActiveIndex.value === firstCtgy_.firstCtgyId) return
    const firstCtgyActiveIndex = FstToThrdCtgy.firstCtgyActiveIndex.value
    if (firstCtgyActiveIndex === firstCtgy_.firstCtgyId) {
      return
    }
    FstToThrdCtgy.firstCtgyActiveIndex.value = firstCtgy_.firstCtgyId
    FstToThrdCtgy.storeFirstCtgy()
  }

  static async getSecThrdCtgyList() {
    // 点击左侧一级图书分类tab，右侧二级三级分类数据同步更新
    watchEffect(async () => {
      await FstToThrdCtgy.store.findSecThrdCtgyList(FstToThrdCtgy.firstCtgyActiveIndex.value)
    })
  }

  static changeReady(secondCtgy: SecondCtgy) {
    secondCtgy.isReadyOpen = !secondCtgy.isReadyOpen
  }

  static toBookInfo(thirdCtgy: ThirdCtgy, secondCtgy: SecondCtgy) {
    secondCtgy.thirdctgys.unshift({
      thirdctgyid: 0,
      thirdctgyname: '全部',
      secctgyid: 0,
    })
    secondCtgy.subThirdctgys.unshift({
      thirdctgyid: 0,
      thirdctgyname: '全部',
      secctgyid: 0,
    })
    FstToThrdCtgy.store.storeSecondCtgy(secondCtgy)
    FstToThrdCtgy.store.storeThirdCtgy(thirdCtgy)
    FstToThrdCtgy.store.storeThirdCtgyList(secondCtgy.thirdctgys)
    FstToThrdCtgy.store.storeSubthirdCtgyList(secondCtgy.subThirdctgys)
    FstToThrdCtgy.store.storeIsReadyOpen(secondCtgy.isReadyOpen)
    router.push({
      path: `/books/${thirdCtgy.thirdctgyid}`,
    })
  }
  static showColLine(second: SecondCtgy, length: number, number: number): boolean {
    return !second.isReadyOpen && length % 3 === number
  }
}
export default FstToThrdCtgy
