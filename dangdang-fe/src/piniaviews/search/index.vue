<template>
  <div>
    <div>搜索页面</div>
    <!-- @blur=""
    @focus="" 
    @keyup
  -->
    <input v-model="keyword" @blur="searchKeywordsService" />

    <div>关键字列表</div>
    <div v-for="item in keywordListGetter" :key="item.keywordid">
      {{ item.keyword }}
    </div>
    <div>历史关键字列表[前6名]</div>
    <div v-for="item in historykeywordListGetter" :key="item.historykeywordid">
      {{ item.historykeyword }} 点击次数：{{ item.clickcount }}
    </div>

    <router-link to="/ctgy">进入搜索结果页</router-link>
  </div>
</template>

<script setup lang="ts">
import { SearchServiceClass } from './service/index'
const { searchKeywordsService, keyword } = SearchServiceClass
const { keywordListGetter, historykeywordListGetter } = SearchServiceClass.storeRefs


</script>

<style scoped lang="scss"></style>
