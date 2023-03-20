<template>
  <div class="content">
    <!-- left ctgy -->
    <div class="firstctgy">adsfb
      <!-- <div v-for="(item, index) in firstCtgyList" @click="changeTab(item)" :key="index">
        <span
          class="absolute left-0 top-[50%] translate-y-[-50%] inline-block w-[3px] h-3"
          :class="{ 'bg-red-700': firstCtgyActiveIndex === item.firstCtgyId }"
        ></span>
        <span>{{ item.firstctgyname }}</span>
      </div> -->
    </div>
    <!-- right ctgy -->
    <div class="secondctgy"></div>
  </div>
</template>
<script setup lang="ts">
// 将所有的js拆分出来
import FstToThrdCtgy from '../service'

const { storeRefs } = FstToThrdCtgy
const { changeTab, getFirstCtgys, changeReady, getSecThrdCtgyList, firstCtgyActiveIndex, toBookInfo, showColLine } = FstToThrdCtgy
const { firstCtgyList, secondCtgyList } = storeRefs
console.log('firstCtgyList:', firstCtgyList)
getFirstCtgys()
getSecThrdCtgyList()
</script>
<style lang="scss">
.content {
  width: 100%;
  position: absolute;
  top: 1.02rem;
  left: 0rem;
  bottom: 0.85rem;
  background-color: aquamarine;

  .firstctgy {
    width: 1.3rem;
    flex-basis: 1.3rem;
    background-color: red;
  }
  .secondctgy {
    background-color: green;
    flex: 1;
    margin-left: 0.19rem;
  }
}
</style>
