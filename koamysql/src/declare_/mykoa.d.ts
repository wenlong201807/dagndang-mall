import 'koa'
import 'process'
import Router from 'koa-router'
declare module 'koa' {
  // 扩展底层模块的属性
  export interface ContextDelegatedResponse {
    params: any
    rootRouter: Router
  }
}

declare module 'process' {
  export interface ProcessEnv {
    NODE_ENV: 'dev' | 'test' | 'prod'
  }
}
