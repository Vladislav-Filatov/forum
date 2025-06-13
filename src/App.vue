<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppLayout from './layouts/AppLayout.vue'
</script>

<template>
  <AppLayout>
    <template #title> </template>
    <template #controls> </template>
    <template #content>
      <RouterView />
    </template>
  </AppLayout>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/index.scss';
</style>
