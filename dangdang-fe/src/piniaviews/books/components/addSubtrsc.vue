<template>
  <div class="add_sub_contain">
    <div class="cart_btn_top_wrap mt-1 dark:text-zinc-100 text-zinc-800">
      <div
        class="add_to_cart ml-6 text-[15px] flex items-center justify-center w-[110px] h-3 bg-[#27272a] rounded-lg"
        v-if="bookItem && bookItem.purcharsenum === 0"
        @click="handleAddBookToShopCart(bookItem)"
      >
        加入购物车
      </div>
      <div class="inner_btn_wrap" v-else-if="bookItem.purcharsenum > 0">
        <!-- 从购物车直接删除，接口已经ok，缺页面删除按钮 -->
        <m-svg-icon
          @click="appOrSubtrBookFrmShopCart('-', bookItem, $event)"
          data-type="jian"
          name="jianshaojianqujianhao"
          :class="btnClass"
          v-if="bookItem.purcharsenum >= 1"
        ></m-svg-icon>
        <span>{{ bookItem.purcharsenum }}</span>
        <span class="add-btn-move" @click="appOrSubtrBookFrmShopCart('+', bookItem, $event)">+</span>
        <!-- <m-svg-icon
          data-type="jia"
          @click="appOrSubtrBookFrmShopCart('+', bookItem, $event)"
          name="zengjia"
          :class="btnClass"
          class="add-btn-move"
        ></m-svg-icon> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BookInfo } from '../../../piniastore/book/state'
// import { BookInfo } from '@/piniastore/book/state'
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

<style scoped lang="scss">
.add_sub_contain {
  display: flex;
  justify-content: flex-end;
  align-items: center;

  .cart_btn_top_wrap {
    width: 130px;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 20px;

    .inner_btn_wrap {
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  }
  .add_to_cart {
    font-size: 20px;
  }
}
</style>
