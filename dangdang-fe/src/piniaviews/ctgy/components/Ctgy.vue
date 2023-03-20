<template>
  <div
    class="absolute top-5 left-0 right-0 bottom-5 text-sm flex gap-1 bg-[#f4f4f5] dark:bg-[#000] dark:text-zinc-100 p-[5px] box-border"
  >
    <!-- left ctgy -->
    <div class="h-full overflow-y-scroll pl-[4px] pt-[10px]">
      <div
        v-for="(item, index) in firstCtgyList"
        @click="changeTab(item)"
        :key="index"
        :class="{ 'bg-zinc-50 text-red-700 font-bold': firstCtgyActiveIndex === item.firstCtgyId }"
        class="relative w-9 h-5 text-center leading-5 bg-[#f4f4f5] dark:bg-[#1e1e1e]"
      >
        <span
          class="absolute left-0 top-[50%] translate-y-[-50%] inline-block w-[3px] h-3"
          :class="{ 'bg-red-700': firstCtgyActiveIndex === item.firstCtgyId }"
        ></span>
        <span>{{ item.firstctgyname }}</span>
      </div>
    </div>
    <!-- right ctgy -->
    <div class="flex-1 h-full mr-1 overflow-y-scroll box-border">
      <div>
        <div
          v-for="second in secondCtgyList"
          :key="second.secondctgyid"
          class="bg-[#fff] dark:bg-[#1e1e1e] my-1 rounded-md p-1 box-border overflow-hidden"
        >
          <div class="flex justify-between">
            <span class="font-semibold">{{ second.secctgyname }}</span>
            <span class="text-gray-400 flex items-center">
              <span>{{ second.secctgyname }}馆</span>
              <m-svg-icon class="w-1.5 h-1.5" color="#9ca3af" name="rigth" />
            </span>
          </div>
          <div class="relative grid grid-cols-third">
            <div
              v-for="third in second.isReadyOpen ? second.subThirdctgys : second.thirdctgys"
              :key="third.thirdctgyid"
              class="h-1 my-1"
              @click="toBookInfo(third, second)"
            >
              {{ third.thirdctgyname }}
            </div>
            <div
              :class="{
                'ml-[160px] ': showColLine(second, second.thirdctgys.length, 0),
                'ml-[70px]': showColLine(second, second.thirdctgys.length, 1),
              }"
              class="text-zinc-600 mt-1 w-[90px] flex items-center justify-center"
              @click="changeReady(second)"
            >
              <span v-show="second.isReadyOpen"> 展开 </span>
              <span v-show="!second.isReadyOpen"> 收起 </span>
              <m-svg-icon :name="second.isReadyOpen ? 'shang' : 'xia'" color="#52525b" class="ml-[5px] w-1.5 h-1.5"></m-svg-icon>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import FstToThrdCtgy from '../service'

const { storeRefs } = FstToThrdCtgy
const { changeTab, getFirstCtgys, changeReady, getSecThrdCtgyList, firstCtgyActiveIndex, toBookInfo, showColLine } = FstToThrdCtgy
const { firstCtgyList, secondCtgyList } = storeRefs

getFirstCtgys()
getSecThrdCtgyList()
</script>
<style></style>
