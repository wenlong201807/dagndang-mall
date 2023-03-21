<template>
  <router-view />
</template>
<script setup lang="ts">
import Theme from './utils/themeUtil'
Theme.watchTheme()
</script>
<style lang="scss">
html {
  width: 100%;
  height: 100%;
  font-size: 20px;

  svg {
    width: 24px;
    height: 24px;
  }
}
</style>
