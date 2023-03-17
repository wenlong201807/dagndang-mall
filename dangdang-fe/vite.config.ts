import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/dang', //url中的基础路径，当多个项目部署在同一个服务器时，可能用得上
  plugins: [vue()],
})
