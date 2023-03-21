import { AxiosResponse } from 'axios'
import { defineStore } from 'pinia'
import shopCartApi from '../../api/shopCartApi'
import { initShopcart, ShopCart } from './state'
import storage, { OPTION } from '@/utils/goodStorageUtil'

// 购物车相关的store
export default defineStore('shopCartStore', {
  state: () => {
    return {
      shopCartList: initShopcart,
    }
  },
  getters: {
    getShopCartList(state): ShopCart[] {
      return state.shopCartList.length > 0 ? state.shopCartList : storage.get('shopCartList')
    },
  },
  actions: {
    storeShopCartList(shopCartList: ShopCart[]) {
      this.shopCartList = shopCartList
    },
    async findShopCartList(userid: number) {
      const res: AxiosResponse<ShopCart[]> = await shopCartApi.findShopCartList(userid)
      console.log(999, res)
      this.shopCartList = res.data
      storage.set('shopCartList', res.data)
      // goodStorage.set('shopCartList', res.data)
    },
    async addBookToShopCart(shopCart: ShopCart) {
      const res: AxiosResponse<ShopCart> = await shopCartApi.addBookToShopCart(shopCart)
      storage.set('shopCartList', res.data, OPTION.ADDAPPENDOBJTOARR, 'shopcartid', res.data.shopcartid)
      this.shopCartList = storage.get('shopCartList', OPTION.ADDAPPENDOBJTOARR)
    },
    async appOrSubtrBookFrmShopCart(shopCart: ShopCart) {
      const res: AxiosResponse<ShopCart> = await shopCartApi.appOrSubtrBookFrmShopCart(shopCart)
      storage.set('shopCartList', shopCart, OPTION.ADDAPPENDOBJTOARR, 'shopcartid', res.data.shopcartid)
      this.shopCartList = storage.get('shopCartList', OPTION.ADDAPPENDOBJTOARR)
    },
    async delBookFrmSC(shopcartid: number) {
      const result: AxiosResponse<number> = await shopCartApi.delBookFrmSc(shopcartid)
      if (result.data > 0) {
        storage.remove('shopCartList', OPTION.ADDAPPENDOBJTOARR, 'shopcartid', shopcartid)
        const shopCartList: ShopCart[] = storage.get('shopCartList', OPTION.ADDAPPENDOBJTOARR)
        this.shopCartList = shopCartList
      }
    },
  },
})
