import store from '@/store'
export class CtgyActions {
  // 静态方法直接调用
  static async findFirstCtgyList() {
    // /src/store/ctgy/index.ts 对应action里的函数名字， 导出的模块名字ctgyModule
    await store.dispatch('ctgyModule/findFirstCtgyList')
  }
  static async findSecThrdCtgyList(firstCtgyId: number) {
    await store.dispatch('ctgyModule/findSecThrdCtgyList', firstCtgyId)
  }
}
