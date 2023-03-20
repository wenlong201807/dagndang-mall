<template>
  <div class="p-1 box-border">
    <search :is-search-type="true"></search>
    <ctgy></ctgy>
  </div>
</template>
<script setup lang="ts">
import search from './components/tosearch.vue'
// import search from '../../components/search/index.vue'
import ctgy from './components/Ctgy.vue'
</script>
 