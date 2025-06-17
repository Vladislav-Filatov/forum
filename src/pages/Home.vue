<script setup lang="ts">
import AppButton from '@/components/AppButton.vue'
import Header from '@/components/Header.vue'
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ROUTER_PATHS } from '@/constants'
import { graphqlService } from '@/services'
import { ElMessageBox } from 'element-plus'

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

type Comment = {
  id: string
  text: string
  hashIp: string
  createdAt: string
  deletedAt: string
  post: {
    id: string
  }
}

const route = useRoute()
const posts = ref<Post[]>([])
const board = ref<Board>()
const isLoading = ref<boolean>(false)
const postComments = ref<Record<string, Comment[]>>({})
const newComments = ref<Record<string, string>>({})

const handleAddComment = async (postId: string) => {
  if (!newComments.value[postId]) return
  try {
    const comment = await graphqlService.createComment({
      postId,
      text: newComments.value[postId],
      hashIp: 'User123',
    })

    if (!postComments.value[postId]) {
      postComments.value[postId] = []
    }
    postComments.value[postId].push(comment)
    newComments.value[postId] = ''
  } catch (error) {
    console.error('Ошибка при создании комментария:', error)
  }
}

const handleDeleteComment = async (postId: string, commentId: string) => {
  try {
    await graphqlService.deleteComment(commentId)
    postComments.value[postId] = postComments.value[postId].filter(
      (comment) => comment.id !== commentId,
    )
  } catch (error) {
    console.error('Ошибка при удалении комментария:', error)
  }
}

const handleDeletePost = async (postId: string) => {
  try {
    await ElMessageBox.confirm(
      'Вы уверены, что хотите удалить этот пост? Это действие нельзя отменить.',
      'Подтверждение удаления',
      {
        confirmButtonText: 'Удалить',
        cancelButtonText: 'Отмена',
        type: 'warning',
      },
    )
    await graphqlService.deletePost(postId)
    posts.value = posts.value.filter((post) => post.id !== postId)
  } catch (error) {
    if (error !== 'cancel') {
      console.error('Ошибка при удалении поста:', error)
    }
  }
}

const init = async () => {
  isLoading.value = false
  const boardId = (route.params.id as string) || '1'
  posts.value = await graphqlService.getPosts(boardId)
  board.value = await graphqlService.getBoards(boardId)
  for (const post of posts.value) {
    newComments.value[post.id] = ''
    const comments = await graphqlService.getComments(post.id)
    postComments.value[post.id] = comments
  }
  isLoading.value = true
}

watch(
  () => route.params.id,
  () => {
    init()
  },
)

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
    <div v-if="isLoading" class="posts-grid">
      <div v-for="post in posts" :key="post.id" class="post">
        <el-button
          class="post__delete-button"
          type="danger"
          size="small"
          @click="handleDeletePost(post.id)"
        >
          Удалить пост
        </el-button>
        <h2 class="post__title">{{ post.title }}</h2>
        <p class="post__text">{{ post.text }}</p>
        <p class="post__created-at">{{ new Date(post.createdAt).toLocaleString() }}</p>
        <!-- momentjs -->
        <div class="comments">
          <h3>Комментарии</h3>
          <div v-if="postComments[post.id]?.length > 0" class="comments__list">
            <div v-for="comment in postComments[post.id]" :key="comment.id" class="comment">
              <p class="comment__text">{{ comment.text }}</p>
              <div class="comment__meta">
                <span>{{ new Date(comment.createdAt).toLocaleString() }}</span>
                <el-icon
                  class="comment__delete-button"
                  @click="handleDeleteComment(post.id, comment.id)"
                >
                  <Delete />
                </el-icon>
              </div>
            </div>
          </div>
          <div v-else class="no-comments">Нет комментариев</div>
          <div class="add-comment">
            <el-input
              v-model="newComments[post.id]"
              type="textarea"
              :rows="2"
              placeholder="Добавить комментарий..."
            />
            <AppButton
              class="submit-button"
              type="primary"
              text="Отправить"
              @click="handleAddComment(post.id)"
              :disabled="!newComments[post.id]"
            >
            </AppButton>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="loading">Загрузка постов...</div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/index.scss';

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(605px, 1fr));
  gap: 2rem;
  padding: 1rem;
}

.post {
  background: white;
  border-radius: 12px;
  box-shadow: 7px 4px 6px 10px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}

.post__delete-button {
  align-self: flex-end;
  padding: 15px 10px;
}
.post__title {
  display: flex;
  justify-content: center;
}

.post__text {
  display: flex;
  justify-content: center;
  white-space: pre-wrap;
}

.post__created-at {
  color: #888;
  font-size: 0.85rem;
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: #666;
  font-style: italic;
}

.comments {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

.comments h3 {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 1rem;
}

.comments__list {
  margin-bottom: 1rem;
}

.comment {
  background: #eff0f4;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 0.8rem;
  display: flex;
  flex-direction: column;
}

.comment__text {
  margin-bottom: 10px;
  color: #333;
}

.comment__meta {
  margin-top: 0;
  font-size: 13px;
  color: #888;
  display: flex;
  justify-content: space-between;
}

.comment__delete-button {
  cursor: pointer;
  width: 20px;
  height: 20px;
}

.no-comments {
  color: #888;
  font-style: italic;
  margin-bottom: 1rem;
}

.add-comment {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.submit-button {
  align-self: flex-end;
}
</style>
