<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { ROUTER_PATHS } from '@/constants'

const router = useRouter()
const route = useRoute()

const isPathActive = (boardId: string) => {
  return route.params.id === boardId
}

const navigateToBoard = (boardId: string) => {
  router.push(`/board/${boardId}`)
}
</script>

<template>
  <div class="menu">
    <div class="menu__header">
      <img class="menu__header-pic" src="@/assets/images/logo-KFU.png" alt="logo" />
      <p class="menu__header-title">KFUch</p>
    </div>
    <el-menu :default-openeds="['1']" :router="true" class="menu__big-element">
      <el-sub-menu index="1">
        <template #title>
          <el-icon><Files /></el-icon>
          <span>Доски</span>
        </template>
        <el-menu-item-group class="menu__small-element" title="Разное">
          <el-menu-item
            :index="ROUTER_PATHS.BOARD"
            :class="['item', isPathActive('1') && 'active']"
            @click="navigateToBoard('1')"
            >Доска 1</el-menu-item
          >
          <el-menu-item
            :index="ROUTER_PATHS.BOARD"
            :class="['item', isPathActive('2') && 'active']"
            @click="navigateToBoard('2')"
            >Доска 2</el-menu-item
          >
        </el-menu-item-group>
        <el-menu-item-group title="Всякое" class="menu__big-element">
          <el-menu-item
            :index="ROUTER_PATHS.BOARD"
            :class="['item', isPathActive('3') && 'active']"
            @click="navigateToBoard('3')"
            >Доска 3</el-menu-item
          >
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
    <el-menu class="menu__big-element">
      <el-sub-menu index="1">
        <template #title>
          <el-icon><User /></el-icon>
          <span>Обратная связь</span>
        </template>
        <el-menu-item-group class="menu__small-element" title="Telegram">
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
  width: 70px;
  height: 55px;
  margin-left: 0;
}

.menu__big-element {
  border: none;
  font-size: 10px;
  background-color: #e9ecee;
}

.menu__small-element {
  background-color: #e9ecee;
}

.menu__header-title {
  font-size: 24px;
  color: $orange;
  width: 90px;
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
    color: darken($orange, 25%);
  }
}
</style>
