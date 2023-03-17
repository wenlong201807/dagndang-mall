<template>
  <div>
    <transition @before-enter="beforeEnter" @enter="dropping" @after-enter="afterEnter">
      <div class="duration-1000" v-show="isVisible">Test</div></transition
    >
    <button @click="handleClick">click</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const isVisible = ref(false)
const handleClick = () => {
  isVisible.value = !isVisible.value
}
const beforeEnter = (ele: Element) => {}
const dropping = (ele: Element, done: (...args: any) => any) => {
  document.body.scrollHeight
  const curEle_ = ele as HTMLBodyElement
  curEle_.style.color = 'red'
  done()
}
const afterEnter = (ele: Element) => {
  console.log('afterEnter')
}
</script>

<style scoped></style>
