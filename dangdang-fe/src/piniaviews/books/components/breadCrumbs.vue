<template>
  <div class="flex p-1 shadow-sm dark:text-zinc-100 text-zinc-900 text-sm font-bold items-center gap-1">
    <span @click="back">{{ getFirstCtgy.firstctgyname }}</span>
    <m-svg-icon class="w-1.5 h-1.5" name="rigth"></m-svg-icon>
    <span>{{ getThirdCtgy.thirdctgyname }}</span>
  </div>
</template>
<script
 setup lang="ts">
import FstToThrdCtgy from '@/piniaviews/ctgy/service/index'
import Books from '../service/index'
const { getThirdCtgy, getFirstCtgy } = FstToThrdCtgy.storeRefs
const { back } = Books
</script>
<style></style>
