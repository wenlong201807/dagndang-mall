<template>
  <div class="bread_title flex p-1 shadow-sm dark:text-zinc-100 text-zinc-900 text-sm font-bold items-center gap-1">
    <span @click="back">{{ getFirstCtgy.firstctgyname }}</span>
    <m-svg-icon  name="rigth"></m-svg-icon>
    <span >{{ getThirdCtgy.thirdctgyname }}</span>
  </div>
</template>
<script
 setup lang="ts">
import FstToThrdCtgy from '../../ctgy/service/index'
// import FstToThrdCtgy from '@/piniaviews/ctgy/service/index'
import Books from '../service/index'
const { getThirdCtgy, getFirstCtgy } = FstToThrdCtgy.storeRefs
const { back } = Books;

</script>
<style lang="scss" scoped>
.bread_title {
  display:flex;
  justify-content:flex-start;
  align-items: center;
  margin: 10px 0;
  font-size: 20px;
}
</style>
