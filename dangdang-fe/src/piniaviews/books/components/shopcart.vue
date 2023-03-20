<template>
  <div class="p-1 flex items-center text-base fixed bottom-[-2px] left-0 w-full bg-[#242424]">
    <div class="w-[120px]" @click="handleClick">
      <div class="relative flex w-5">
        <m-svg-icon class="w-4 h-4" color="#c92626" name="shopcart" />
        <span class="absolute px-[6px] top-[-4px] right-0 rounded-2xl text-sm bg-red-700">{{ totalCount }}</span>
      </div>
    </div>
    <div class="h-5 text-lg flex items-center justify-center flex-1 bg-[#eab80a] rounded-xl text-zinc-100">
      ￥{{ totalPrice }} 去支付
    </div>
    <div>
      <transition @before-enter="beforeEnter" @enter="dropping" @after-enter="afterEnter">
        <div class="cubic fixed bottom-4 left-4" v-show="ball.isVisible">
          <div class="inner-ball w-2 h-2 bg-red-700 rounded-full"></div></div
      ></transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import ShopCartClass from '@/piniaviews/books/service/shopCart'
import { useRouter } from 'vue-router'
const { refreshShopCartList, afterEnter, dropping, beforeEnter, ball } = ShopCartClass
const { isVisible } = ball.value
const { totalCount, totalPrice } = refreshShopCartList()
const router = useRouter()
const handleClick = () => {
  router.push('/shopcartlist')
}
</script>
<style>
.cubic {
  transition: all 0.4s cubic-bezier(0.48, -0.35, 0.78, 0.45);
}
.inner-ball {
  transition: all 0.4s linear;
}
</style>
