<template>
  <div>
    <book-detail :ISBN="ISBN"></book-detail>
  </div>
</template>

<script setup lang="ts">
import bookDetail from './components/bookDetail.vue'

import { useRoute } from 'vue-router'
const route = useRoute()
const ISBN: string = route.params.id as string
</script>

<style scoped></style>
