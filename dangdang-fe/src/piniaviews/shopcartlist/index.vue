<template>
  <div class="text-sm text-zinc-200">
    <m-navbar :sticky="true">我的购物车</m-navbar>
    <div class="pb-5">
      <div v-for="(item, index) in getShopCartList" :key="index">
        <van-swipe-cell>
          <div class="flex mb-1 relative p-1 gap-1 items-center">
            <van-checkbox v-model="item.checked" @click="handlecheckItem(item)"></van-checkbox>
            <img :src="getImg(item.bookpicname)" class="w-8 h-8 m-1" alt="" />
            <div class="flex-1">{{ item.bookname }} {{ item.shopcartid }}</div>
            <div
              @click="handleChange(item)"
              class="absolute right-1 bottom-0 rounded-sm h-2 flex items-center justify-center text-sm"
            ></div>
            <div class="mt-4">
              <addSubtrsc
                @handleAddBookToShopCart="handleAddBookToShopCart"
                @appOrSubtrBookFrmShopCart="appOrSubtrBookFrmShopCart"
                :bookItem="item"
                class="gap-1"
                btnClass="w-2 h-2"
              ></addSubtrsc>
            </div>
          </div>
          <template #right>
            <van-button square text="删除" type="danger" class="delete-button" />
            <van-button square type="primary" text="收藏" class="delete-button" />
          </template>
        </van-swipe-cell>
      </div>
    </div>
    <div class="bg-[#27272a] flex items-center justify-between p-[8px] box-border fixed bottom-0 left-0 w-full">
      <van-checkbox v-model="isSelectAll" @change="handleCheckAll"> <span class="text-zinc-300"> 全选 </span></van-checkbox>
      <div class="flex items-center gap-2">
        <span
          >合计：<span>￥</span><span class="text-[#d92c2c] text-lg">{{ totalPrice }}</span></span
        >
        <div class="bg-[#ef7e16] p-1 rounded-lg w-10 text-center">结算</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import shopCartClass from '../../piniaviews/books/service/shopCart'
// import shopCartClass from '@/piniaviews/books/service/shopCart'
import { ImgUtil } from '../../utils/imgUtil'
import { onMounted, ref } from 'vue'
import ShopCartClass from '../../piniaviews/books/service/shopCart'
import { BookInfo } from '../../piniastore/book/state'
import addSubtrsc from '../books/components/addSubtrsc.vue'
import { ShopCart } from '../../piniastore/shopCart/state'
const { getShopCartList } = shopCartClass.storeRefs
const { refreshShopCartList, isSelectAll, handleCheckAll, handlecheckItem } = ShopCartClass
const { totalCount, totalPrice } = refreshShopCartList(true)
const { getImg } = ImgUtil
const handleAddBookToShopCart = (bookItem: BookInfo) => {
  ShopCartClass.handleAddBookToShopCart(bookItem)
}
const appOrSubtrBookFrmShopCart = (type: string, bookItem: ShopCart, event: any) => {
  bookItem.checked = true
  ShopCartClass.appOrSubtrBookFrmShoListCart(type, bookItem, event)
}
const handleChange = (item: any) => {
  item.visible = true
  console.log(item)
}
</script>
<style scoped>
.delete-button {
  height: 100%;
}
</style>
