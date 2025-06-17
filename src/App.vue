<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppLayout from './layouts/AppLayout.vue'
</script>

<template>
  <AppLayout>
    <template #content>
      <RouterView />
    </template>
  </AppLayout>
</template>

<style lang="scss">
@import '@/assets/styles/index.scss';

body {
  background-color: #e9ecee;
  min-height: 100vh;
}

#app {
  min-height: 100vh;
}
</style>
