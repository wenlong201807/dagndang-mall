<template>
  <div class="second_list_wrap relative flex flex-wrap text-sm text-[#000] dark:text-[#fff] dark:bg-[#27272a] bg-[#fff] p-[5px] rounded-sm">
    <div class="second_item" :class="{ second_item_active: 0 == thirdctgyid }" @click="changeTab(0)">全部</div>
    <div
      class="second_item text-center mr-2 mb-1 p-[2px] w-[65px] rounded-sm"
      :class="{ second_item_active: item.thirdctgyid == thirdctgyid }"
      @click="changeTab(item.thirdctgyid)"
      v-for="(item, index) in isReadyOpen ? getSubthirdCtgyList : getThirdCtgyList"
      :key="index"
    >
      {{ item.thirdctgyname }}
    </div>
    <m-svg-icon @click="storeIsReadyOpen(!isReadyOpen)" class="absolute right-2 bottom-1 w-2 h-2" :name="isReadyOpen ? 'shang' : 'xia'"></m-svg-icon>
  </div>
</template>
<script setup lang="ts">
import FstToThrdCtgy from '../../ctgy/service/index'
// import FstToThrdCtgy from '@/piniaviews/ctgy/service/index'
import Books from '../service/index'
import { useRoute } from 'vue-router'

const route = useRoute()

const { getThirdCtgyList, getSubthirdCtgyList, isReadyOpen } = FstToThrdCtgy.storeRefs
const { storeIsReadyOpen } = FstToThrdCtgy.store
const { thirdctgyid } = Books
const { changeTab } = new Books({ route })
</script>
<style lang="scss" scoped>
.second_list_wrap {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  font-size: 20px;
  border-radius: 4px;
  margin: 10px 0;
  padding: 10px;
  background: #ccc;

  .second_item {
    white-space: nowrap;
    margin-right: 14px;
    cursor: pointer;
  }

  .second_item_active {
    color: red;
  }
}
</style>
