<template>
  <div class="mt-1 text-sm dark:text-zinc-100 text-zinc-600">
    <div @click="handleClick">
      <img ref="imgRef" class="rounded-sm object-contain" :src="getImg(book.bookpicname)" alt="" />
      <div class="mt-1 flex gap-1 flex-col break-words">
        <div class="line-clamp-3">{{ book.bookname }}</div>
        <div class="flex gap-2">
          <div class="text-[12px] text-zinc-400">作者 {{ book.author }}</div>
          <div class="text-[12px] text-zinc-400">销量 {{ book.monthsalecount }}</div>
        </div>
        <div class="flex gap-1">
          <span class="font-bold text-red-600">￥{{ book.discountprice }}</span>
          <span class="line-through"> ￥{{ book.originalprice }}</span>
          <span class="text-[9px] text-orange-300">{{ book.discount }}折</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ImgUtil } from '@/utils/imgUtil'
import { BookInfo } from '@/piniastore/book/state'
import { ref } from 'vue'

interface Container {
  width: number
  bottom: number
  height: number
  left: number
  right: number
  top: number
  x: number
  y: number
}

const props = defineProps<{
  book: BookInfo
}>()

const emits = defineEmits(['click'])
const imgRef = ref<HTMLImageElement | null>(null)

const { getImg } = ImgUtil

/**
 * 跳转处理，记录图片
 */
const imgContainerCenter = () => {
  const container: any = imgRef.value?.getBoundingClientRect()
  return {
    translateX: parseInt(container?.x + container?.width / 2),
    translateY: parseInt(container?.y + container?.height / 2),
  }
}

const handleClick = () => {
  emits(
    'click',
    {
      id: props.book.ISBN,
      localtion: imgContainerCenter(),
    },
    {
      data: props.book,
    }
  )
}
</script>

<style scoped lang="scss"></style>
