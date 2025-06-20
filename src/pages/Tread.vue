<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue'
import AppButton from '@/components/AppButton.vue'
import Header from '@/components/Header.vue'
import { ref, onMounted } from 'vue'
import { ROUTER_PATHS } from '@/constants'
import { useRouter, useRoute } from 'vue-router'
import { graphqlService } from '@/services'

const form = ref({
  title: '',
  content: '',
  image: '',
})

const router = useRouter()
const route = useRoute()
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

const isLoading = ref(false)
const error = ref('')
const boardId = route.params.id as string

const submitPost = async () => {
  isLoading.value = true
  error.value = ''
  try {
    const newPost = await graphqlService.createPost({
      boardId,
      title: form.value.title,
      text: form.value.content,
      hashIp: 'localhost',
    })
    form.value.title = ''
    form.value.content = ''
    form.value.image = ''
    router.push({
      path: `/board/${boardId}`,
      query: { refresh: Date.now() },
    })
  } catch (e: any) {
    error.value = e.message || 'Ошибка при создании поста'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <Header>
    <template #title> Новый тред </template>
    <template #controls>
      <AppButton text="Назад" @click="goBack" />
    </template>
  </Header>
  <div class="thread-form">
    <el-form @submit.prevent="submitPost" :model="form" label-position="top">
      <el-form-item class="form__label" label="Заголовок">
        <el-input
          class="form__header-input"
          v-model="form.title"
          placeholder="Введите заголовок треда"
          required
        />
      </el-form-item>

      <el-form-item class="form__label" label="Изображение">
        <el-upload
          class="image-upload"
          action="#"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="handleImageChange"
          required
        >
          <img v-if="form.image" :src="form.image" class="preview-image" />
          <AppButton class="form__image-button" v-else text="Загрузить изображение" />
        </el-upload>
      </el-form-item>

      <el-form-item class="form__label" label="Содержание">
        <el-input
          v-model="form.content"
          type="textarea"
          :rows="6"
          placeholder="Введите текст треда"
        />
      </el-form-item>

      <div class="form-accept">
        <button class="submit-button" type="submit">Сохранить</button>
      </div>
    </el-form>
  </div>
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

.form__label {
  font-weight: 600;
}

.form-accept {
  margin-top: 20px;
  display: flex;
}

.form__image-button {
  font-size: 14px;
  margin-bottom: 20px;
}

.form__header-input {
  margin-bottom: 20px;
}

.submit-button {
  background-color: $orange;
  padding: 12px 20px;
  border: none;
  font-size: 15px;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: darken($orange, 25%);
  }
}
</style>
