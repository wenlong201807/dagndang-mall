<template>
  <div
    class="relative w-full"
    ref="containerTarget"
    :style="{
      height: containerHeight + 'px',
    }"
  >
    <template v-if="data.length && columnWidth">
      <div
        class="m-waterfall-item absolute"
        v-for="(item, index) in data"
        :key="index"
        :style="{
          width: columnWidth + 'px',
          left: item._style?.left + 'px',
          top: item._style?.top + 'px',
        }"
      >
        <slot :item="item" :index="index"></slot>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { BookInfo } from '@/piniastore/book/state'
import { watch, ref, computed, nextTick, onMounted } from 'vue'
import waterfall from '@/utils/waterfall'

const { getImgElements, getAllImg, onComplateImgs, getMinHeightColumn, getMinHeight, getMaxHeight } = waterfall
const props = defineProps<{
  data: BookInfo[]
  column: number
  columnSpacing: number // 列间距
  rowSpacing: number // 行间距
  picturePreReading: Boolean // 是否需要进行图片预读取
}>()

const containerHeight = ref<number>(0)
const columnHeightObj = ref<Record<number, number>>({})
const columnWidth = ref<number>(0)
const containerWidth = ref<number>(0)
const containerTarget = ref<HTMLElement | null>(null)
const containerLeft = ref<number>(0)
const loading = ref(false)

const columnSpacingTotal = computed<number>(() => {
  return (props.column - 1) * props.columnSpacing
})

const useColumnHeightObj = () => {
  columnHeightObj.value = {}
  for (let i = 0; i < props.column; i++) {
    columnHeightObj.value[i] = 0
  }
}

/**
 * 图片不需要预加载时，计算 item 高度
 */
let itemHeights: number[] = []

const useItemHeight = () => {
  itemHeights = []
  let itemElements = [...(document.getElementsByClassName('m-waterfall-item') as any)]
  const imgElements = getImgElements(itemElements)
  const allImgs = getAllImg(imgElements)

  onComplateImgs(allImgs)
    .then(() => {
      itemElements.forEach((el) => {
        itemHeights.push(el.offsetHeight)
      })
      useItemLocation()
      setTimeout(() => {
        loading.value = true
      }, 500)
    })
    .catch((e) => {
      throw new Error(e)
    })
}

const waitImgComplate = () => {
  itemHeights = []
  let itemElements = [...(document.getElementsByClassName('m-waterfall-item') as any)]
  const imgElements = getImgElements(itemElements)
  const allImgs = getAllImg(imgElements)
  onComplateImgs(allImgs)
    .then(() => {
      // 图片加载完成，获取高度
      itemElements.forEach((el) => {
        itemHeights.push(el.offsetHeight)
      })
      // 渲染位置
      useItemLocation()
    })
    .catch((e) => {
      throw new Error(e)
    })
}

const useItemLocation = () => {
  props.data.forEach((item, index) => {
    if (item._style) {
      return
    }
    item._style = { left: 0, top: 0 }
    item._style.left = getItemLeft()
    item._style.top = getItemTop()
    increasingHeight(index)
  })
  containerHeight.value = getMaxHeight(columnHeightObj.value)
}

const getItemLeft = () => {
  const column = getMinHeightColumn(columnHeightObj.value)
  return parseInt(column) * (columnWidth.value + props.columnSpacing) + containerLeft.value
}
const getItemTop = () => {
  return getMinHeight(columnHeightObj.value)
}

const useContainerWidth = () => {
  const { paddingLeft, paddingRight } = getComputedStyle(containerTarget.value as HTMLElement, null)
  containerLeft.value = parseFloat(paddingLeft)
  containerWidth.value = (containerTarget.value as HTMLElement).offsetWidth - parseFloat(paddingLeft) - parseFloat(paddingRight)
}

const useColumnWidth = () => {
  useContainerWidth()
  columnWidth.value = (containerWidth.value - columnSpacingTotal.value) / props.column
}

const increasingHeight = (index: number) => {
  const minHeightColumn = getMinHeightColumn(columnHeightObj.value)
  columnHeightObj.value[parseInt(minHeightColumn)] += itemHeights[index] + props.rowSpacing
}

onMounted(() => {
  useColumnWidth()
})

watch(
  () => props.data,
  (newVal) => {
    // console.log('newVal', props.data)

    const resetColumnHeight = newVal.every((item) => !item._style)
    if (resetColumnHeight) {
      useColumnHeightObj()
    }
    if (props.picturePreReading) {
      nextTick(() => {
        waitImgComplate()
      })
    } else {
      nextTick(() => {
        setTimeout(() => {
          useItemHeight()
        },200)
      })
    }
  },
  {
    immediate: true,
    deep: true,
  }
)
</script>

<style lang="scss" scoped></style>
