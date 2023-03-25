<template>
  <div>
    <div>商品头部组件</div>
    <div class="header_wrap">
      <div @click="back">返回</div>
      <router-link replace to="/goods">商品</router-link>
      <router-link replace to="/goods">详情</router-link>
      <router-link replace to="/evaluate">评论</router-link>
      <router-link replace to="/evaluate">相关</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
const back = () => {
  window.history.back()
}
</script>

<style scoped lang="scss">
.header_wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
