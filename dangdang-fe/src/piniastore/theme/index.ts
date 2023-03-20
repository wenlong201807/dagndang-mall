import { defineStore } from 'pinia'
import { theme } from './state'

export const themeStore = defineStore('themeStore', {
  state: () => {
    return {
      themeType: 'light' as theme,
    }
  },
  getters: {
    // 只接受state参数，或者无参数
    getCurTheme(state) {
      return state.themeType
    },
  },
  actions: {
    // 可以接受任意参数，state的数据直接通过this上下文获取
    changeThemeType(themeType: theme) {
      this.themeType = themeType
    },
  },
})
