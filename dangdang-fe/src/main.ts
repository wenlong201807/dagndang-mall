import { createApp } from 'vue'
import App from './App.vue'
import { ImgUtil } from './utils/imgUtil'
import './styles/index.scss'
import router from '@/router'
import store from '@/store'
import mLibs from './components/index'
import 'vant/lib/index.css'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import 'virtual:svg-icons-register'
import flexible from './utils/flexible'
import { SwipeCell, Button, Radio, Checkbox, CheckboxGroup } from 'vant'

import { createPinia } from 'pinia'
ImgUtil.storageImgList()
flexible.initUseRem()
createApp(App).use(createPinia()).use(router).use(SwipeCell).use(Button).use(Checkbox).use(CheckboxGroup).use(Radio).use(store).use(mLibs).mount('#app')
