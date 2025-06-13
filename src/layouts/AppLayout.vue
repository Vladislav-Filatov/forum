<script setup lang="ts">
import AppMenu from '@/components/AppMenu.vue'
</script>

<template>
  <div class="root">
    <nav class="menu">
      <AppMenu />
    </nav>
    <main class="main">
      <div class="content">
        <slot name="content"></slot>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/index.scss';

.root {
  display: flex;
  min-height: 100%;
}

.menu {
  width: 220px;
  min-height: 100%;
}

.main {
  flex: 1;
  padding: 16px;
  min-height: 100vh;
}
</style>
