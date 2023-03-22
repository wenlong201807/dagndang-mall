import shopCartDao from '../dao/ShopCartDao'
import { ShopCartRaw, ShopCartRaw_ } from '../raw'
import { combine } from '../../../modules/commontypes'

class ShopCartService {
  static shopCartService = new ShopCartService()

  async findCurUserShopCartList(userid: number) {
    return await shopCartDao.findCurUserShopCartList(userid)
  }

  async addBookToShopCart(shopCart: ShopCartRaw) {
    // 数组的第一个就是主键id值
    const res = await shopCartDao.addBookToShopCart(shopCart)
    return combine({ shopcartid: res[0] }, shopCart)
  }

  async appOrSubtrBookFrmShopCart(shopCart: ShopCartRaw_) {
    await shopCartDao.appOrSubtrBookFrmShopCart(shopCart)
    // 异步更新后，返回的shopCart 多个主键id
    return shopCart
  }
  async deOneBookFrmSc(shopcartid: number) {
    return await shopCartDao.deOneBookFrmSc(shopcartid)
  }
}
export default ShopCartService.shopCartService
