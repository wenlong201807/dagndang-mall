<template>
  <div class="mt-1 dark:text-zinc-100 text-zinc-800">
    <div
      class="add_to_cart ml-6 text-[15px] flex items-center justify-center w-[110px] h-3 bg-[#27272a] rounded-lg"
      v-if="bookItem && bookItem.purcharsenum === 0"
      @click="handleAddBookToShopCart(bookItem)"
    >
      加入购物车
    </div>
    <div class="flex text-lg items-center" :class="class" v-else-if="bookItem.purcharsenum > 0">
      <m-svg-icon
        @click="appOrSubtrBookFrmShopCart('-', bookItem, $event)"
        data-type="jian"
        name="jianshaojianqujianhao"
        :class="btnClass"
        v-if="bookItem.purcharsenum >= 1"
      ></m-svg-icon>
      <span>{{ bookItem.purcharsenum }}</span>
      <m-svg-icon
        data-type="jia"
        @click="appOrSubtrBookFrmShopCart('+', bookItem, $event)"
        name="zengjia"
        :class="btnClass"
      ></m-svg-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BookInfo } from '@/piniastore/book/state'
// import ShopCart from '../service/shopCart'
defineProps<{
  bookItem: any
  class: string
  btnClass: string
}>()

const emits = defineEmits(['handleAddBookToShopCart', 'appOrSubtrBookFrmShopCart'])
const handleAddBookToShopCart = (bookItem: BookInfo) => {
  emits('handleAddBookToShopCart', bookItem)
}
const appOrSubtrBookFrmShopCart = (type: string, bookItem: BookInfo, event: any) => {
  emits('appOrSubtrBookFrmShopCart', type, bookItem, event)
}
// const { handleAddBookToShopCart, appOrSubtrBookFrmShopCart } = ShopCart
</script>

<style scoped>
.add_to_cart {
  font-size: 20px;
}
</style>
