import 'koa'
import 'process'
import Router from 'koa-router'
declare module 'koa' {
  export interface ContextDelegatedResponse {
    params: any
    rootRouter: Router
  }
}

declare module 'process' {
  export interface ProcessEnv {
    NODE_ENV: any
  }
}
