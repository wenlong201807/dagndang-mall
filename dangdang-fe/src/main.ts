import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { ImgUtil } from './utils/imgUtil'
import flexible from './utils/flexible'

ImgUtil.storageImgList()
flexible.initUseRem()

createApp(App).mount('#app')
