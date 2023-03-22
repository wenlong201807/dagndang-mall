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
    /**
     * 添加到购物对象，
     * 1 发送接口，更新数据库的购物车表内容
     * 2 前端本地存储更新
     * 3 将页面的数据从本地存储中获取更新，展示到ui上
     * 
     * 注意bug：本地存储中，添加购物对象，追加/减少 已有购物对象中的数量。这些都是针对同一个购物对象，即 储存对象是同一个 shopCartList
     * @param shopCart 
     */
    async addBookToShopCart(shopCart: ShopCart) {
      const res: AxiosResponse<ShopCart> = await shopCartApi.addBookToShopCart(shopCart)
      storage.set('shopCartList', res.data, OPTION.ADDAPPENDOBJTOARR, 'shopcartid', res.data.shopcartid)
      this.shopCartList = storage.get('shopCartList', OPTION.ADDAPPENDOBJTOARR)
    },
    /**
     * 追加或减少购物对象的数量
     * @param shopCart
     */
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
