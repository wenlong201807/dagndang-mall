import { Module } from 'vuex'
import { CtgyState, initCtgyState, FirstCtgy, SecondCtgy } from './state'
import ctgyAPI from '@/api/ctgyApi'
import { AxiosResponse } from 'axios'

export const ctgyModule: Module<CtgyState, {}> = {
  namespaced: true,
  state: initCtgyState,
  getters: {
    getFirstCtgyList(state) {
      return state.firstCtgyList
    },
    getSecThrdCtgyList(state) {
      return state.secondCtgyList
    },
  },
  mutations: {
    storeFirstCtgyLst(state, firstCtgyList_: FirstCtgy[]) {
      state.firstCtgyList = firstCtgyList_
    },
    storeSecondCtgyLst(state, secondCtgyList_: SecondCtgy[]) {
      state.secondCtgyList = secondCtgyList_
    },
  },
  actions: {
    async findFirstCtgyList({ commit }) {
      const result = await ctgyAPI.getFirstCtgyList()
      commit('storeFirstCtgyLst', result.data)
    },
    async findSecThrdCtgyList({ commit }, firstCtgysId: number) {
      let result: AxiosResponse<SecondCtgy[]> = await ctgyAPI.getSecThrdCtgyList(firstCtgysId)
      result.data = result.data.map((secondctgy) => {
        secondctgy.isReadyOpen = true
        return (secondctgy.subThirdctgys = secondctgy.thirdctgys.slice(0, 5)), secondctgy
      })
      console.log(result.data)

      commit('storeSecondCtgyLst', result.data)
    },
  },
}
