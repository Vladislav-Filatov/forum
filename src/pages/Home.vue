<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue'
import AppButton from '@/components/AppButton.vue'
import { ref, onMounted } from 'vue'
import { InfoService } from '@/services'
import { useRouter, useRoute } from 'vue-router'
import { ROUTER_PATHS } from '@/constants'

const info = ref()

const fetchInfo = async () => {
  try {
    info.value = await InfoService.getByName()
    console.log('Полученные данные:', info.value)
  } catch (error) {
    console.log('не получилось', error)
  }
}

onMounted(fetchInfo)
</script>

<template>
  <AppLayout>
    <template #title> Название доски </template>
    <template #controls>
      <router-link :to="ROUTER_PATHS.TREAD">
        <AppButton text="Добавить тред" />
      </router-link>
    </template>
    <template #content>
      <div v-if="info?.data" class="dragons-grid">
        <div v-for="dragon in info.data" :key="dragon.id" class="dragon-card">
          <div class="dragon-image" v-if="dragon.flickr_images?.length">
            <img :src="dragon.flickr_images[0]" :alt="dragon.name" />
          </div>
          <div class="dragon-info">
            <h2>{{ dragon.name }}</h2>
            <p class="description">{{ dragon.description }}</p>

            <div class="specs">
              <div class="spec-item">
                <span class="label">Тип:</span>
                <span class="value">{{ dragon.type }}</span>
              </div>
              <div class="spec-item">
                <span class="label">Экипаж:</span>
                <span class="value">{{ dragon.crew_capacity }} человек</span>
              </div>
              <div class="spec-item">
                <span class="label">Масса:</span>
                <span class="value">{{ dragon.dry_mass_kg }} кг</span>
              </div>
              <div class="spec-item">
                <span class="label">Первый полет:</span>
                <span class="value">{{ new Date(dragon.first_flight).toLocaleDateString() }}</span>
              </div>
            </div>

            <div class="links">
              <a :href="dragon.wikipedia" target="_blank" class="wiki-link">Wikipedia</a>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="loading">Загрузка данных...</div>
    </template>
  </AppLayout>
</template>

<style scoped>
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
