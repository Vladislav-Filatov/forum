<script setup lang="ts">
import AppMenu from '@/components/AppMenu.vue'
</script>

<template>
  <div class="root">
    <nav class="menu">
      <AppMenu />
    </nav>
    <main class="main">
      <div class="header">
        <div class="header__title">
          <slot name="title"></slot>
        </div>
        <div class="header__controls">
          <slot name="controls"></slot>
        </div>
      </div>
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

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header__title {
  font-size: 30px;
  color: $orange;
  cursor: pointer;
  &:hover {
    color: darken($orange, 20%);
  }
}
</style>
