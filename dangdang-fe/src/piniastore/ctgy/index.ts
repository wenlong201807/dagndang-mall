import { CtgyState, initCtgyState, FirstCtgy, SecondCtgy, ThirdCtgy } from './state'
import ctgyAPI from '@/api/ctgyApi'
import { AxiosResponse } from 'axios'
import { defineStore } from 'pinia'
import goodStorage from 'good-storage'

function hasProps(data: any) {
  if (Array.isArray(data)) {
    return Boolean(data.length)
  } else if (data.constructor === Object) {
    return Boolean(Object.getOwnPropertyNames(data).length)
  }
}

export const ctgyStore = defineStore('cgtyStore', {
  state: () => {
    return {
      firstCtgyList: [] as FirstCtgy[], // 断言方式会破坏原有数据结构
      secondCtgyList: [] as SecondCtgy[],
      thirdCtgy: {} as ThirdCtgy,
      firstCtgy: {} as FirstCtgy,
      secondCtgy: {} as SecondCtgy,
      thirdCtgyList: [] as ThirdCtgy[],
      subthirdCtgyList: [] as ThirdCtgy[],
      isReadyOpen: true,
    }
  },
  getters: {
    getFirstCtgyList(state): FirstCtgy[] {
      return state.firstCtgyList
    },
    getSecThrdCtgyList(state): SecondCtgy[] {
      return state.secondCtgyList
    },
    getThirdCtgy(state): ThirdCtgy {
      // 确保可以被持续缓存数据
      // 如果是元数据的引用地址，内容改变 则更新缓存，否则使用缓存数据
      // console.log('三级数据getters缓存了:', 666)
      return hasProps(state.thirdCtgy) ? state.thirdCtgy : goodStorage.get('thirdCtgy')
    },
    getThirdCtgyList(state): ThirdCtgy[] {
      if (hasProps(state.thirdCtgyList)) {
        return state.thirdCtgyList
      } else {
        state.thirdCtgyList = goodStorage.get('thirdCtgyList')
        return state.thirdCtgyList
      }
      // return hasProps(state.thirdCtgyList) ? state.thirdCtgyList : (state.thirdCtgyList = goodStorage.get('thirdCtgyList'))
    },
    getSubthirdCtgyList(state): ThirdCtgy[] {
      if (hasProps(state.subthirdCtgyList)) {
        return state.subthirdCtgyList
      } else {
        state.subthirdCtgyList = goodStorage.get('subthirdCtgyList')
        return state.subthirdCtgyList
      }
      // return hasProps(state.subthirdCtgyList) ? state.subthirdCtgyList : goodStorage.get('subthirdCtgyList')
    },
    // 添加缓存：刷新的时候保持状态
    getFirstCtgy(state): FirstCtgy {
      return hasProps(state.firstCtgy) ? state.firstCtgy : goodStorage.get('firstCtgy')
    },
    getSecondCtgy(state): SecondCtgy {
      return hasProps(state.secondCtgy) ? state.secondCtgy : goodStorage.get('secondCtgy')
    },
  },
  actions: {
    storeThirdCtgyList(thirdCtgyList: ThirdCtgy[]) {
      goodStorage.set('thirdCtgyList', thirdCtgyList)
      this.thirdCtgyList = thirdCtgyList
      console.log(this.thirdCtgyList)
    },
    storeSubthirdCtgyList(subthirdCtgyList: ThirdCtgy[]) {
      goodStorage.set('subthirdCtgyList', subthirdCtgyList)
      this.subthirdCtgyList = subthirdCtgyList
    },
    storeThirdCtgy(thirdCtgy: ThirdCtgy) {
      this.thirdCtgy = thirdCtgy
      goodStorage.set('thirdCtgy', thirdCtgy)
    },
    storeIsReadyOpen(isReadyOpen: boolean) {
      this.isReadyOpen = isReadyOpen
    },
    storeFirstCtgy(firstCtgy: FirstCtgy) {
      this.firstCtgy = firstCtgy
      goodStorage.set('firstCtgy', firstCtgy)
    },
    storeSecondCtgy(secondCtgy: SecondCtgy) {
      this.secondCtgy = secondCtgy
      goodStorage.set('secondCtgy', secondCtgy)
    },
    firstCtgysPosition() {
      if (!hasProps(this.thirdCtgyList)) {
        const thirdCtgyList: ThirdCtgy[] = goodStorage.get('thirdCtgyList')
        thirdCtgyList.splice(0, 1)
        goodStorage.set('thirdCtgyList', thirdCtgyList)
        console.log(thirdCtgyList)
      }
    },
    async findFirstCtgyList() {
      const result = await ctgyAPI.getFirstCtgyList()
      console.log('findFirstCtgyList接口result数据: ', result)
      this.firstCtgyList = result?.data || []
    },
    async findSecThrdCtgyList(firstCtgysId: number) {
      let result: AxiosResponse<SecondCtgy[]> = await ctgyAPI.getSecThrdCtgyList(firstCtgysId)
      result.data = result.data.map((secondctgy) => {
        secondctgy.isReadyOpen = true
        return (secondctgy.subThirdctgys = secondctgy.thirdctgys.slice(0, 5)), secondctgy
      })
      this.secondCtgyList = result.data
    },
  },
})

/**
defineStore 源码类型解读
declare type UnwrapRefSimple<T> = T extends Function | CollectionTypes | BaseTypes | Ref | RefUnwrapBailTypes[keyof RefUnwrapBailTypes] | {
    [RawSymbol]?: true;
} ? T : T extends ReadonlyArray<any> ? {
    [K in keyof T]: UnwrapRefSimple<T[K]>;
} : T extends object & {
    [ShallowReactiveMarker]?: never;
} ? {
    [P in keyof T]: P extends symbol ? T[P] : UnwrapRef<T[P]>;
} : T;
 */