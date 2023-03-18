import koa from 'koa'
import AllCtrlRouterLoader from './common/AllCtrlRouterLoader'

const app = new koa()

AllCtrlRouterLoader.init(app)
