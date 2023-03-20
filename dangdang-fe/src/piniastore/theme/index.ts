import { defineStore } from 'pinia'
import { theme } from './state'

export const themeStore = defineStore('themeStore', {
  state: () => {
    return {
      themeType: 'dark' as theme,
    }
  },
  getters: {
    getCurTheme(state) {
      return state.themeType
    },
  },
  actions: {
    changeThemeType(themeType: theme) {
      this.themeType = themeType
    },
  },
})
