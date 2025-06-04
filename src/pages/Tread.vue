<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue'
import AppButton from '@/components/AppButton.vue'
import { ref, onMounted } from 'vue'
import { ROUTER_PATHS } from '@/constants'
import { useRouter } from 'vue-router'

const form = ref({
  title: '',
  content: '',
  image: '',
})

const router = useRouter()
const goBack = () => {
  router.back()
}

const handleImageChange = (file: any) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    form.value.image = e.target?.result as string
  }
  reader.readAsDataURL(file.raw)
}
</script>

<template>
  <AppLayout>
    <template #title> Новый тред </template>
    <template #controls>
      <!-- <router-link :to="ROUTER_PATHS.HOME"> -->
      <AppButton text="Назад" @click="goBack" />
      <!-- </router-link> -->
    </template>
    <template #content>
      <div class="thread-form">
        <el-form :model="form" label-position="top">
          <el-form-item label="Заголовок">
            <el-input v-model="form.title" placeholder="Введите заголовок треда" />
          </el-form-item>

          <el-form-item label="Изображение">
            <el-upload
              class="image-upload"
              action="#"
              :auto-upload="false"
              :show-file-list="false"
              :on-change="handleImageChange"
            >
              <img v-if="form.image" :src="form.image" class="preview-image" />
              <el-button v-else type="primary">Загрузить изображение</el-button>
            </el-upload>
          </el-form-item>

          <el-form-item label="Содержание">
            <el-input
              v-model="form.content"
              type="textarea"
              :rows="6"
              placeholder="Введите текст треда"
            />
          </el-form-item>

          <div class="form-actions">
            <!-- <router-link :to="отправлять данные на сервак"> -->
            <AppButton text="Сохранить" />
            <!-- </router-link> -->
          </div>
        </el-form>
      </div>
    </template>
  </AppLayout>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/index.scss';
.thread-form {
  padding: 20px;
}

.image-upload {
  width: 100%;
  max-width: 100px;

  .preview-image {
    width: 100%;
    max-height: 300px;
    object-fit: cover;
    border-radius: 4px;
  }
}

.form-actions {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}
</style>
