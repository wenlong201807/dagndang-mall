<template>
  <div class="box-border text-zinc-100" ref="containerRef">
    <div class="sticky top-[-2px] h-6 flex w-full items-center dark:bg-[#242424] bg-[#fff] z-20">
      <m-svg-icon name="left" class="w-2 h-2 m-1" color="#707070" @click="back"></m-svg-icon>
      <search :is-search-type="false" class="w-full" :thirdCtgy="getThirdCtgy"></search>
      <m-svg-icon name="gengduo" class="w-2 h-2 m-1" color="#707070"></m-svg-icon>
    </div>
    <div class="m-1 box-border rounded-sm overflow-hidden">
      <img class="w-full h-[140px] object-cover" :src="getImg('pexels-photo.png')" alt="" />
    </div>
    <bread-crumbs></bread-crumbs>
    <book-sort @rise-orfall="handleriseOrfall" @synthe-size="handleSyntheSize" :isReadyAsc="isReadyAsc"></book-sort>
    <thrd-ctgy></thrd-ctgy>
    <m-infinite-list @onLoad="getBookDataPager" :hasMoreData="hasMoreData" :isLoading="isLoading">
      <div class="flex flex-wrap px-1 box-border justify-between">
        <m-waterfall :data="bookList" :column="2" :columnSpacing="20" :rowSpacing="20" :picturePreReading="false">
          <template v-slot="{ item }">
            <book-item :book="item" @click="handleToPins"></book-item>
            <add-subtrsc
              @handleAddBookToShopCart="handleAddBookToShopCart"
              @appOrSubtrBookFrmShopCart="appOrSubtrBookFrmShopCart"
              :bookItem="item"
              class="gap-1"
              btnClass="w-2 h-2"
            ></add-subtrsc>
          </template>
        </m-waterfall>
        <transition :css="false" @before-enter="beforeEnter" @enter="enter" @leave="leave">
          <book-detail v-if="isVisiblePins" :ISBN="currentPins.id"></book-detail>
        </transition>
      </div>
    </m-infinite-list>
    <shop-cart></shop-cart>
  </div>
</template>
<script setup lang="ts">
import search from '../../components/search/index.vue'
import books from './service/index'
import ShopCartClass from './service/shopCart'
import shopCart from './components/shopcart.vue'
import breadCrumbs from './components/breadCrumbs.vue'
import thrdCtgy from './components/thrdCtgy.vue'
import bookItem from './components/bookItem.vue'
import bookSort from './components/booksort.vue'
import bookDetail from '../bookDetail/components/bookDetail.vue'
import addSubtrsc from './components/addSubtrsc.vue'
import { ImgUtil } from '@/utils/imgUtil'
import { ctgyStore } from '@/piniastore/ctgy/index'
import { useRoute } from 'vue-router'
import { ref, watch, onMounted } from 'vue'
import gsap from 'gsap'
import { useEventListener } from '@vueuse/core'
import { useScrollLock } from '@vueuse/core'
import { BookInfo } from '@/piniastore/book/state'

const {
  back,
  findBooksByThirdCtgyId,
  handleriseOrfall,
  handleSyntheSize,
  reset,
  bookList,
  thirdctgyid,
  isReadyAsc,
  hasMoreData,
  isLoading,
} = books

interface CurrentPins {
  id: string
  localtion: {
    translateX: number
    translateY: number
  }
}

onMounted(async () => {})
reset()
findBooksByThirdCtgyId()
type Callback = (...args: any[]) => void | null
type TweenTarget = string | object | null

const { getBookDataPager } = new books()
const { getImg } = ImgUtil
const { getThirdCtgy } = ctgyStore()
const route = useRoute()

const isVisiblePins = ref(false)
const currentPins = ref<CurrentPins>({
  id: '',
  localtion: {
    translateX: 0,
    translateY: 0,
  },
})
const containerRef = ref<HTMLElement | null>(null)
const isLocked = useScrollLock(document.body)
const secctgyid = route.params.thirdctgyid as any
thirdctgyid.value = secctgyid

useEventListener(window, 'popstate', () => {
  isVisiblePins.value = false
})
const handleAddBookToShopCart = (bookItem: BookInfo) => {
  ShopCartClass.handleAddBookToShopCart(bookItem)
}
const appOrSubtrBookFrmShopCart = (type: string, bookItem: BookInfo, event: any) => {
  ShopCartClass.appOrSubtrBookFrmShopCart(type, bookItem, event)
  ShopCartClass.drop(event)
}
const handleToPins = (item: CurrentPins) => {
  isVisiblePins.value = true
  currentPins.value = item
  history.pushState(null, null as any, `/bookDetail/${item.id}`)
}

const beforeEnter = (el: TweenTarget) => {
  gsap.set(el, {
    scaleX: 0,
    scaleY: 0,
    transformOrigin: '0 0',
    translateX: currentPins.value.localtion?.translateX,
    translateY: currentPins.value.localtion?.translateY,
    opacity: 0,
  })
}

const enter = (el: TweenTarget, done: Callback) => {
  gsap.to(el, {
    duration: 0.3,
    scaleX: 1,
    scaleY: 1,
    opacity: 1,
    translateX: 0,
    translateY: 0,
    onComplete: done, // 结束callback
  })
}

const leave = (el: TweenTarget, done: Callback) => {
  gsap.to(el, {
    duration: 0.3,
    scaleX: 0,
    scaleY: 0,
    translateX: currentPins.value.localtion?.translateX,
    translateY: currentPins.value.localtion?.translateY,
    onComplete: done, // 结束callback
  })
}

watch(
  () => isVisiblePins.value,
  (val) => {
    isLocked.value = val
  },
  {
    immediate: true,
  }
)
</script>

<style>
/* filter: blur(); */
</style>
