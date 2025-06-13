<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ROUTER_PATHS } from '@/constants'

const router = useRouter()
const route = useRoute()

const isPathActive = (path: string) => {
  return route.path === path
}
</script>

<template>
  <div class="menu">
    <div class="menu__header">
      <img class="menu__header-pic" src="@/assets/images/4032679.png" alt="logo" />
      <p class="menu__header-title">Форум со шменявками</p>
    </div>
    <el-menu :default-openeds="['1']" :router="true" class="menu__el">
      <el-sub-menu index="1">
        <template #title>
          <el-icon><Files /></el-icon>
          <span>Доски</span>
        </template>
        <el-menu-item-group title="Космос">
          <el-menu-item
            :index="ROUTER_PATHS.HOME"
            :class="['item', isPathActive(ROUTER_PATHS.HOME) && 'active']"
            >Доска 1</el-menu-item
          >
          <el-menu-item
            :index="ROUTER_PATHS.BOARD1"
            :class="['item', isPathActive(ROUTER_PATHS.BOARD1) && 'active']"
            >Доска 2</el-menu-item
          >
        </el-menu-item-group>
        <el-menu-item-group title="Всякое">
          <el-menu-item index="1-3" :class="['item']">Доска 3</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
    <el-menu class="menu__el">
      <el-sub-menu index="1">
        <template #title>
          <el-icon><User /></el-icon>
          <span>Обратная связь</span>
        </template>
        <el-menu-item-group title="Telegram">
          <el-menu-item index="1-1"
            ><a class="contact" href="https://t.me/Vllad_Filatov">Влад</a></el-menu-item
          >
          <el-menu-item index="1-1"
            ><a class="contact" href="https://t.me/gfdmit">Радмир</a></el-menu-item
          >
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/index.scss';

.menu {
  height: 100%;
  border-right: 2px solid $orange;
  padding: 0 10px 0;
  display: flex;
  flex-direction: column;
}

.menu__header-pic {
  width: 32px;
  height: 32px;
}

.menu__el {
  border: none;
  font-size: 10px;
}

.menu__header-title {
  font-size: 16px;
  color: $orange;
  width: 115px;
}

.menu__header {
  border-bottom: 1.8px solid $orange;
  padding: 20px 15px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.contact {
  color: black;
}

.item {
  color: $orange;

  &.active {
    color: darken($orange, 20%);
  }
}
</style>
