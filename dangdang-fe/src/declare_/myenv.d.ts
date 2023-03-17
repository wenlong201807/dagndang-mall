import 'dotenv'
declare module 'dotenv' {
  // 会和底层的同名接口合并，由此做扩展
  export interface DotenvParseOutput {
    VITE_BASE_URL: string
    VITE_HOST: string
    VITE_PORT: number
    VITE_PROXY_DOMAIN: string
  }
}
