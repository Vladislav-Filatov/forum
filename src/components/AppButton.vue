<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <el-button class="btn" type="primary">{{ text }}</el-button>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/index.scss';

.btn {
  background-color: $orange;
  padding: 20px;
  border: none;
  font-size: 15px;
  &:hover {
    background-color: darken($orange, 25%);
  }
}
</style>
