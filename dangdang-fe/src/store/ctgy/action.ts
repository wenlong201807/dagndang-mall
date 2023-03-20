import store from '@/store'
export class CtgyActions {
  static async findFirstCtgyList() {
    await store.dispatch('ctgyModule/findFirstCtgyList')
  }
  static async findSecThrdCtgyList(firstCtgyId: number) {
    await store.dispatch('ctgyModule/findSecThrdCtgyList', firstCtgyId)
  }
}
