<template>
  <div class="header">
    <div class="header__title">
      <slot name="title"></slot>
    </div>
    <div class="header__controls">
      <slot name="controls"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/index.scss';

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
