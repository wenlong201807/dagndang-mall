<template>
  <div>
    <!-- <book-detail :ISBN="ISBN"></book-detail> -->
<Header />
<router-view />
  </div>
</template>

<script setup lang="ts">
import Header from './components/header.vue'
// import bookDetail from './components/bookDetail.vue'

import { useRoute } from 'vue-router'
const route = useRoute()
const ISBN: string = route.params.id as string
</script>

<style scoped></style>
