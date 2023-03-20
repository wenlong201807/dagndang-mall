<template>
  <div class="text-[#fff] text-base fixed left-0 top-0 w-screen h-screen z-20 dark:bg-[#242424] bg-[#fff] overflow-y-auto">
    <div class="mt-1relative flex items-center justify-center h-5 box-border">
      <m-svg-icon name="left" class="absolute left-0 t-[50%] w-2.5 h-2.5" @click="handleBack"></m-svg-icon>
      <div class="line-clamp-1">{{ bookdetail?.bookname }}</div>
    </div>
    <div class="mt-2 flex justify-center">
      <img :src="getImg(bookdetail?.bookpicname as string)" alt="" />
    </div>
    <div class="flex flex-col gap-1 mt-2 py-1 box-border">
      <div class="text-red-700 text-[28px]">￥{{ bookdetail?.discountprice }}</div>
      <div class="text-sm">￥{{ bookdetail?.originalprice }}</div>
      <div class="text-zinc-200">作者{{ bookdetail?.author }}</div>
      <div class="text-zinc-400">出版社：{{ bookdetail?.publishername }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BookInfo } from '@/piniastore/book/state'
import bookApi from '@/api/bookApi'
import { useRouter } from 'vue-router'
import { Ref, ref } from 'vue'
import { ImgUtil } from '@/utils/imgUtil'
import { toFixed_ } from '@/common/index'

const props = defineProps<{
  ISBN: string
}>()

const { getImg } = ImgUtil
const bookdetail: Ref<BookInfo | null> = ref(null)

const findBookDetail = async () => {
  const res = await bookApi.findBookDetail(props.ISBN)
  res.data.discountprice = toFixed_(res.data.discount * res.data.originalprice)
  bookdetail.value = res.data
}
findBookDetail()

const router = useRouter()
const handleBack = () => {
  router.back()
}
</script>

<style lang="scss" scoped></style>
