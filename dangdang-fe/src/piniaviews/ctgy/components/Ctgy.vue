<template>
  <div class="content">
    <!-- left ctgy -->
    <div class="firstctgy">
      <div v-for="(item, index) in firstCtgyList" @click="changeTab(item)" :key="index">
        <span
          class="absolute left-0 top-[50%] translate-y-[-50%] inline-block w-[3px] h-3"
          :class="{ 'bg-red-700': firstCtgyActiveIndex === item.firstCtgyId }"
        ></span>
        <span>{{ item.firstctgyname }}</span>
      </div>
    </div>
    <!-- right ctgy -->
    <div class="secondctgy">
      <div>
        <div v-for="second in secondCtgyList" :key="second.secondctgyid" class="bg-[#fff] dark:bg-[#1e1e1e] my-1 rounded-md p-1 box-border overflow-hidden">
          <div class="sec_title">
            <span class="left_title">{{ second.secctgyname }}</span>
            <span class="">
              <span>{{ second.secctgyname }}馆</span>
              <m-svg-icon color="#9ca3af" name="rigth" />
            </span>
          </div>
          <!-- 第三级布局 -->
          <div class="thrdctgy_wrap">
            <div
              v-for="third in second.isReadyOpen ? second.subThirdctgys : second.thirdctgys"
              :key="third.thirdctgyid"
              class="three_item"
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
// 将所有的js拆分出来
import FstToThrdCtgy from '../service'
// import thirdctgyView from './thirdctgy.vue'
const { storeRefs } = FstToThrdCtgy
const { changeTab, getFirstCtgys, changeReady, getSecThrdCtgyList, firstCtgyActiveIndex, toBookInfo, showColLine } = FstToThrdCtgy
const { firstCtgyList, secondCtgyList } = storeRefs

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
  font-size: 20px;
  display: flex;
  justify-content: space-between;

  .firstctgy {
    width: 120px;
  }
  .secondctgy {
    flex: 1;
    margin-left: 10px;
    overflow: auto;

    .sec_title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-right: 10px;
    }

    .left_title {
      color: red;
    }
  }

  .thrdctgy_wrap {
    display: flex;
    flex-wrap: wrap;
    font-size: 14px;
    background: #ccc;
    margin-bottom: 20px;
    .three_item {
      width: 30%;
    }
  }
}
</style>
