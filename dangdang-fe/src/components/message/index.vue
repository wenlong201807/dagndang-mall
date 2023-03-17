<template>
  <transition name="down" @after-leave="destroy">
    <div
      v-show="isVisable"
      class="min-w-[420px] fixed top-0 left-[50%] translate-x-[-50%] z-50 flex items-center px-3 py-1.5 rounded-sm border cursor-pointer"
      :class="styles[type].containerClass"
    >
      <span class="w-full text-sm text-center" :class="styles[type].textClass">{{ content }}</span>
    </div>
  </transition>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  type: 'warn' | 'error' | 'success'
  content: String
  duration: number
  destroy: Function
}>()

const isVisable = ref<boolean>(false)

type styleType = {
  icon: string
  containerClass: string
  textClass: string
}
type messageType = {
  warn: styleType
  error: styleType
  success: styleType
}
const styles: messageType = {
  warn: {
    icon: 'warn',
    containerClass: 'bg-warn-100 border-warn-200',
    textClass: 'text-warn-300',
  },
  error: {
    icon: 'error',
    textClass: 'text-error-300',
    containerClass: 'bg-error-100 border-error-200',
  },
  success: {
    icon: 'success',
    textClass: 'text-success-300',
    containerClass: 'bg-success-100 border-success-200',
  },
}

onMounted(() => {
  isVisable.value = true
  setTimeout(() => {
    isVisable.value = false
  }, props.duration)
})
</script>
<style lang="scss" scoped>
.down-enter-active,
.down-leave-active {
  transition: all 0.5s;
}

.down-enter-from,
.down-leave-to {
  opacity: 0;
  transform: translate3d(-50%, -100px, 0);
}
</style>
