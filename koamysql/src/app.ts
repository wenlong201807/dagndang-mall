// require('module-alias/register')
// import moduleAlias from 'module-alias'
import koa from 'koa'
import AllCtrlRouterLoader from './common/AllCtrlRouterLoader'

// 使用别名的工具
// moduleAlias.addAlias({
//   '@/controllers':  __dirname + '/controllers',
//   '@/common':  __dirname + '/common',
//   '@/modules':  __dirname + '/modules',
//   '@/mstypes':  __dirname + '/mstypes'
// })

const app = new koa()

// 扩展路由，扩展其他业务的时候，不再修改入口文件，只需要专注于具体业务即可
AllCtrlRouterLoader.init(app)
 