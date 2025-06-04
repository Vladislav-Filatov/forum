<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue'
import AppButton from '@/components/AppButton.vue'
import { ref, onMounted } from 'vue'
import { ROUTER_PATHS } from '@/constants'
</script>

<template>
  <AppLayout>
    <template #title> Другая доска </template>
    <template #controls>
      <router-link :to="ROUTER_PATHS.TREAD">
        <AppButton text="Добавить тред" />
      </router-link>
    </template>
    <template #content>ага</template>
  </AppLayout>
</template>

<style scoped></style>
