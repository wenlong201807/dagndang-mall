import { ShopCart } from '../piniastore/shopCart/state'
import request from '../utils/axiosUtil'

class ShopCartApi {
  static shopCartApi: ShopCartApi = new ShopCartApi()
  findShopCartList(userid: number) {
    return request.get(`/shopcartmodule/findCurUserShopCartList/${userid}`, false)
  }
  addBookToShopCart(shopCart: ShopCart) {
    return request.post('/shopcartmodule/addBookToShopCart', false, shopCart)
  }
  appOrSubtrBookFrmShopCart(shopCart: ShopCart) {
    return request.post('/shopcartmodule/appOrSubtrBookFrmShopCart', false, shopCart)
  }
  delBookFrmSc(shopcartid: number) {
    return request.delete('/shopcartmodule/delBookShopCart/' + shopcartid, false)
  }
}

export default ShopCartApi.shopCartApi
