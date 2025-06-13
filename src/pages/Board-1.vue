<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue'
import AppButton from '@/components/AppButton.vue'
import Header from '@/components/Header.vue'
import { ref, onMounted } from 'vue'
import { InfoService } from '@/services'
import { useRouter, useRoute } from 'vue-router'
import { ROUTER_PATHS } from '@/constants'
import { graphqlService } from '@/services'

const info = ref()

const fetchInfo = async () => {
  try {
    info.value = await InfoService.getByName()
    console.log('Полученные данные:', info.value)
  } catch (error) {
    console.log('не получилось', error)
  }
}

type Post = {
  id: string
  title: string
  text: string
  createdAt: string
}

type Board = {
  id: string
  name: string
}

const posts = ref<Post[]>([])
const board = ref<Board>()
const isLoading = ref<boolean>(false)

const init = async () => {
  isLoading.value = false
  posts.value = await graphqlService.getPosts('2')
  board.value = await graphqlService.getBoards('2')
  console.log(posts.value)
  isLoading.value = true
}

init()
</script>

<template>
  <div>
    <Header>
      <template #title> {{ board?.name }} </template>
      <template #controls>
        <router-link :to="{ path: ROUTER_PATHS.TREAD.replace(':id', board?.id || '') }">
          <AppButton text="Добавить тред" />
        </router-link>
      </template>
    </Header>
    <div>
      <div v-if="isLoading" class="posts-grid">
        <div v-for="post in posts" :key="post.id" class="post-card">
          <h2>{{ post.title }}</h2>
          <p>{{ post.text }}</p>
          <div class="created-at">{{ new Date(post.createdAt).toLocaleString() }}</div>
          <!-- momentjs -->
        </div>
      </div>
      <div v-else class="loading">Загрузка постов...</div>
    </div>
  </div>
</template>

<style scoped>
.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
}

.post-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1rem;
}

.created-at {
  color: #888;
  font-size: 0.85rem;
  margin-top: 1rem;
}
.dragons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
}

.dragon-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.dragon-card:hover {
  transform: translateY(-5px);
  cursor: pointer;
}

.dragon-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.dragon-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.dragon-info {
  padding: 1.5rem;
}

.dragon-info h2 {
  margin: 0 0 1rem 0;
  color: #333;
  font-size: 1.5rem;
}

.description {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.specs {
  display: grid;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.spec-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  background: #f5f5f5;
  border-radius: 4px;
}

.label {
  font-weight: bold;
  color: #555;
}

.value {
  color: #333;
}

.links {
  display: flex;
  gap: 1rem;
}

.wiki-link {
  color: #0066cc;
  text-decoration: none;
  font-weight: 500;
}

.wiki-link:hover {
  text-decoration: underline;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: #666;
  font-style: italic;
}
</style>
