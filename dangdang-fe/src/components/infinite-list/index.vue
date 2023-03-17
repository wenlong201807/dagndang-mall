<template>
  <div class="relative">
    <slot></slot>
    <div ref="loadingTarget" class="h-6 py-4">
      <m-svg-icon v-if="isLoading" class="w-4 h-4 mx-auto animate-spin" name="infinite-load"></m-svg-icon>
      <!-- 加载更多 -->
      <p v-if="hasMoreData" class="text-center text-base text-zinc-400">已经没有更多数据了!</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'
import { watch, Ref, ref } from 'vue'

const props = defineProps<{
  hasMoreData: boolean
  isLoading: boolean
}>()
const emits = defineEmits(['onLoad', 'changLoading'])

const targetIsIntersecting = ref(false)
const loadingTarget: Ref<HTMLElement | null> = ref(null)

useIntersectionObserver(loadingTarget, ([{ isIntersecting }], observerElement) => {
  targetIsIntersecting.value = isIntersecting
  emitLoad()
})

const emitLoad = () => {
  setTimeout(() => {
    if (targetIsIntersecting.value && !props.hasMoreData && !props.isLoading) {
      emits('changLoading', true)
      emits('onLoad')
    }
  }, 100)
}

watch(
  () => props.isLoading,
  () => {
    // emitLoad()
  }
)
</script>

<style scoped></style>
