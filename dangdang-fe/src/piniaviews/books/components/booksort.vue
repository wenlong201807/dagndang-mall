<template>
  <div class="text-sm m-2 dark:text-[#fff] text-[#000]">
    <div class="sort_wrap">
      <div class="flex-1" @click="handleSyntheSize" :class="{ 'text-red-600': currentIndex === 0 }">综合</div>
      <div class="flex-1" @click="handleSalesVolume" :class="{ 'text-red-600': currentIndex === 1 }">销量</div>
      <div
        class="relative gap-[4px] flex-1 flex items-center"
        :class="{ 'text-red-600': currentIndex === 2 }"
        @click="handleriseOrfall(isReadyAsc ? 'ASC' : 'DESC')"
      >
        <span>价格</span>
        <span>
          <m-svg-icon v-show="isReadyAsc" name="xia" class="w-1.5 h-1.5"></m-svg-icon>
          <m-svg-icon v-show="!isReadyAsc" name="shang" class="w-1.5 h-1.5"></m-svg-icon>
        </span>
      </div>
      <div class="flex-1" :class="{ 'text-red-600': currentIndex === 3 }">店铺</div>
      <div class="flex-1 flex items-center gap-1" :class="{ 'text-red-600': currentIndex === 4 }">
        <span>筛选</span>
        <m-svg-icon name="shaixuan" class="w-1.5 h-1.5"></m-svg-icon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  isReadyAsc: boolean
}>()

const emits = defineEmits(['riseOrfall', 'syntheSize'])

const currentIndex = ref<number>()

const handleriseOrfall = (type: string) => {
  currentIndex.value = 2
  emits('riseOrfall', type)
}
const handleSyntheSize = () => {
  currentIndex.value = 0
  emits('syntheSize')
}
const handleSalesVolume = () => {
  currentIndex.value = 1
}
</script>

<style scoped lang="scss">
.sort_wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
}
</style>
