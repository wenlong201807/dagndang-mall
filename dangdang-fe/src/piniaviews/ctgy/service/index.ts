import { ref, watchEffect } from 'vue'
import { SecondCtgy, FirstCtgy } from '@/store/state'
import { ctgyStore } from '@/piniastore/ctgy/index'
import { storeToRefs } from 'pinia'
import router from '@/router'
import { ThirdCtgy } from '@/piniastore/ctgy/state'

class FstToThrdCtgy {
  // 必须放在函数或者class内部
  static store = ctgyStore()

  // 响应式的store只能用于 state，getters中
  // 返回响应式store数据
  static storeRefs = storeToRefs(FstToThrdCtgy.store)
  static firstCtgyActiveIndex = ref<number>(0)

  static async getFirstCtgys() {
    // 直接更新store中actions的方法，执行异步接口数据更新，存储其state中，并响应到页面
    // 执行action中的方法，不能是响应式的store，否则产生响应式死循环

    await FstToThrdCtgy.store.findFirstCtgyList()
    FstToThrdCtgy.firstCtgyActiveIndex.value = 1
    FstToThrdCtgy.storeFirstCtgy()
  }

  // 保存一级分类
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

  // 面包屑中二级分类名字获取
  static toBookInfo(thirdCtgy: ThirdCtgy, secondCtgy: SecondCtgy) {
    // 需要先判断是否 已经存在 全部这一项，再添加
    // console.log('secondCtgy.thirdctgys:', secondCtgy.thirdctgys)
    // console.log('secondCtgy.subThirdctgys:', secondCtgy.subThirdctgys)
    // if (secondCtgy.thirdctgys[0].thirdctgyname !== '全部') {
    //   secondCtgy.thirdctgys.unshift({
    //     thirdctgyid: 0,
    //     thirdctgyname: '全部',
    //     secctgyid: 0,
    //   })
    // }
    // if (secondCtgy.subThirdctgys[0].thirdctgyname !== '全部') {
    //   secondCtgy.subThirdctgys.unshift({
    //     thirdctgyid: 0,
    //     thirdctgyname: '全部',
    //     secctgyid: 0,
    //   })
    // }
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
