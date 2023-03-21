import { success } from '../common/ResResult'
import { Context } from 'koa'
import { Controller } from '../decorator/controllerdecorator'
import { get, post, del } from '../decorator/reqmethoddecorator'
import shopCartService from '../modules/shopcart/service/ShopCartService'
import { ShopCartRaw, ShopCartRaw_ } from '@/modules/shopcart/raw'

@Controller('/shopcartmodule')
class ShopCartController {
  // http://127.0.0.1:3005/dang/shopcartmodule/findCurUserShopCartList/1
  @get('/findCurUserShopCartList/:userid')
  async findCurUserShopCartList(ctx: Context) {
    const { userid } = ctx.params
    ctx.body = success(await shopCartService.findCurUserShopCartList(userid))
  }
  @post('/addBookToShopCart')
  async addBookToShopCart(ctx: Context) {
    const shopCartRaw: ShopCartRaw = ctx.request.body
    ctx.body = success(await shopCartService.addBookToShopCart(shopCartRaw))
  }

  @post('/appOrSubtrBookFrmShopCart')
  async appOrSubtrBookFrmShopCart(ctx: Context) {
    const shopCartRaw_: ShopCartRaw_ = ctx.request.body
    ctx.body = success(await shopCartService.appOrSubtrBookFrmShopCart(shopCartRaw_))
  }
  @del('/delBookShopCart/:shopcartid')
  async deOneBookFrmSc(ctx: Context) {
    const { shopcartid } = ctx.params
    const delRecNum = await shopCartService.deOneBookFrmSc(shopcartid)
    ctx.body = success(delRecNum)
  }
}

export {}
