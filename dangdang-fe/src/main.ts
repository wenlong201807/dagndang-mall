import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { ImgUtil } from './utils/imgUtil'
import flexible from './utils/flexible'

ImgUtil.storageImgList()
flexible.initUseRem()

createApp(App).use(ElementPlus, {}).mount('#app')
