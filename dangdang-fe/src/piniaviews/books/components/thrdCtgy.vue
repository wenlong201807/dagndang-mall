<template>
  <div class="relative flex flex-wrap text-sm text-[#000] dark:text-[#fff] dark:bg-[#27272a] bg-[#fff] p-[5px] rounded-sm">
    <div
      class="text-center mr-2 mb-1 p-[2px] w-[65px] rounded-sm"
      :class="{ 'bg-[#000] text-[#fff]': item.thirdctgyid == thirdctgyid }"
      @click="changeTab(item.thirdctgyid)"
      v-for="(item, index) in isReadyOpen ? getSubthirdCtgyList : getThirdCtgyList"
      :key="index"
    >
      {{ item.thirdctgyname }}
    </div>
    <m-svg-icon
      @click="storeIsReadyOpen(!isReadyOpen)"
      class="absolute right-2 bottom-1 w-2 h-2"
      :name="isReadyOpen ? 'shang' : 'xia'"
    ></m-svg-icon>
  </div>
</template>
<script setup lang="ts">
import FstToThrdCtgy from '@/piniaviews/ctgy/service/index'
import Books from '../service/index'
import { useRoute } from 'vue-router'

const route = useRoute()

const { getThirdCtgyList, getSubthirdCtgyList, isReadyOpen } = FstToThrdCtgy.storeRefs
const { storeIsReadyOpen } = FstToThrdCtgy.store
const { thirdctgyid } = Books
const { changeTab } = new Books({ route })
</script>
<style></style>
