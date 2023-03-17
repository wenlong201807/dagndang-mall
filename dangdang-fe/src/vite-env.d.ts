// 全局依赖库 例如 env文件也是依赖它的
/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 和env接口合并
interface ImportMetaEnv {
  VITE_username: string
  VITE_age: number
}
