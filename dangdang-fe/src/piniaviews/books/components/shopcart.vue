<template>
  <div class="p-1 flex items-center text-base fixed bottom-[-2px] left-0 w-full bg-[#242424]">
    <div class="shop_cart_bottom_wrap">
      <div class="w-[120px]">
        <div class="relative flex w-5">
          <m-svg-icon class="w-4 h-4" color="#c92626" name="shopcart" />
          <span class="absolute px-[6px] top-[-4px] right-0 rounded-2xl text-sm bg-red-700">{{ totalCount }}</span>
        </div>
      </div>
      <div @click="handleClick" class="pay_btn">￥{{ totalPrice }} 去支付 -></div>
    </div>
    <!-- 加入购物车动画 TODO -->
    <div class="ball-container">
      <transition @before-enter="beforeEnter" @enter="dropping" @after-enter="afterEnter">
        <div class="ball cubic" v-show="ball.isVisible">
          <div class="inner-ball"></div>
        </div>
      </transition>
    </div>
    <!-- <div>
      <transition @before-enter="beforeEnter" @enter="dropping" @after-enter="afterEnter">
        <div class="cubic fixed bottom-4 left-4" v-show="ball.isVisible">
          <div class="inner-ball w-2 h-2 bg-red-700 rounded-full"></div></div
      ></transition>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import ShopCartClass from '../../../piniaviews/books/service/shopCart'
// import ShopCartClass from '@/piniaviews/books/service/shopCart'
import { useRouter } from 'vue-router'
const { refreshShopCartList, afterEnter, dropping, beforeEnter, ball } = ShopCartClass
const { isVisible } = ball.value
const { totalCount, totalPrice } = refreshShopCartList()
const router = useRouter()
const handleClick = () => {
  router.push('/shopcartlist')
}
</script>
<style lang="scss">
// 动画小球
.ball-container {
  width: 20px;
  height: 20px;
  position: fixed;
  left: 30px;
  bottom: 20px;
  border-radius: 50%;
  // background: red;

  .cubic {
    // cubic-bezier(x1, y1, x2, y2)
    // x1 代表动点1 的横坐标
    // y1 代表动点1 的纵坐标
    // x2 代表动点2 的横坐标
    // x2 代表动点2 的纵坐标

    // 控制y轴的位移
    transition: all 1.5s cubic-bezier(0.48, -0.35, 0.78, 0.45);

    .inner-ball {
      width: 20px;
      height: 20px;
      background: green;
      border-radius: 50%;
      // 子元素的动画效果是，父元素动画 + 子元素动画 两者叠加的结果
      // 控制x轴的位移
      transition: all 1.5s linear;
    }
  }
}

.shop_cart_bottom_wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  padding-bottom: 10px;

  .pay_btn {
    border: 1px solid #ccc;
    border-radius: 20px;
    padding: 4px 10px;
  }
}
</style>
