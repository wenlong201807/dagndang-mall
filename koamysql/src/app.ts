import koa from 'koa'
import AllCtrlRouterLoader from './common/AllCtrlRouterLoader'

const app = new koa()

// 扩展路由，扩展其他业务的时候，不再修改入口文件，只需要专注于具体业务即可
AllCtrlRouterLoader.init(app)
