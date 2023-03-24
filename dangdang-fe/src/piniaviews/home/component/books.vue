<template>
  <div>
    <div>首页-图书列表区</div>

    <!-- 分页编写： 两个同时只展示一个 -->
    <div v-show="!isLastPageService">动画组件</div>
    <div v-show="isLastPageService">到底了提示</div>
  </div>
</template>

<script setup lang="ts">
// 引入的方法可直接在html中使用
import { HomeClass, trimStr } from '../service/index'

const { findBookWithPagerService, isLastPageService } = HomeClass
// 初始化执行 created(){}
findBookWithPagerService()
const { pageBookListGetter } = HomeClass.storeToRefs
// 图书列表展示数据源
console.log('首页-books- pageBookListGetter:', pageBookListGetter)
</script>

<style scoped lang="scss"></style>
