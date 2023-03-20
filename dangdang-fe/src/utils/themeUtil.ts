import { watch } from 'vue'
import { themeType } from '@/constants/index'
import { themeStore } from '@/piniastore/theme/index'
import { storeToRefs } from 'pinia'

class Theme {
  static matchMedia: any
  static watchSystemThemeChange() {
    if (this.matchMedia) return
    this.matchMedia = window.matchMedia('(prefers-color-scheme: light)')
    this.matchMedia.onchange = function () {
      this.changeTheme()
    }
  }
  static changeTheme(theme?: string) {
    const documentEl: any = document
    let themeClassName = ''
    const { THEME_DARK, THEME_SYSTEM, THEME_LIGHT } = themeType
    switch (theme) {
      case THEME_LIGHT:
        themeClassName = 'light'
        break
      case THEME_DARK:
        themeClassName = 'dark'
        break
      case THEME_SYSTEM:
        this.watchSystemThemeChange()
        themeClassName = this.matchMedia.matches ? 'dark' : 'light'
        break
    }

    const style: HTMLStyleElement = document.createElement('style')
    style.id = 'htmlStyle'

    if (themeClassName === 'dark') {
      style.appendChild(document.createTextNode('html{background: #1a1a1a;}'))
    } else {
      style.appendChild(document.createTextNode('html{background: #fff;}'))
    }

    document.head.appendChild(style)
    documentEl.querySelector('html').className = themeClassName
  }
  static watchTheme() {
    const store = themeStore()
    const { getCurTheme } = storeToRefs(store)
    watch(
      () => getCurTheme.value,
      (theme) => {
        Theme.changeTheme(theme)
      },
      {
        immediate: true,
      }
    )
  }
}

export default Theme
