<template>
  <div :class="class" class="relative group dark:bg-zinc-800 bg-[#f4f4f5] text-sm flex rounded-lg px-2 items-center duration-500">
    <!-- 搜索icon -->
    <m-svg-icon class="w-1.5 h-1.5 mr-2" color="#707070" name="suosuo" />
    <input
      v-if="isSearchType"
      type="text"
      placeholder="搜索"
      class="dark:text-zinc-100 outline-none w-full h-[34px] dark:bg-zinc-800 bg-zinc-100"
    />
    <div v-else class="flex-1 h-[34px] flex items-center">
      <div class="relative flex items-center">
        <div class="rounded-lg absolute z-20 flex items-center bg-zinc-400 text-xs">
          <span class="text-zinc-50 px-1 whitespace-nowrap p-[5px]">{{ thirdCtgy?.thirdctgyname }}</span>
          <m-svg-icon class="w-1.5 h-1.5" color="#fff" name="cha" />
        </div>
        <input
          type="text"
          placeholder="搜索"
          class="dark:bg-zinc-800 dark:text-zinc-100 absolute z-0 rounded-lg outline-none h-[34px] bg-zinc-100"
        />
      </div>
    </div>
    <m-svg-icon class="absolute w-1.5 h-1.5 mr-2 right-0" name="saomao" color="#707070" />
  </div>
</template>
<script setup lang="ts">
import { ThirdCtgy } from '@/piniastore/ctgy/state'
const props = defineProps<{
  class?: string
  isSearchType: boolean
  thirdCtgy?: ThirdCtgy
}>()
</script>

<style></style>
