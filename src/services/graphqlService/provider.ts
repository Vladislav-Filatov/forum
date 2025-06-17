import { RADMIR_INFO } from '@/constants/api'

async function graphqlRequest(query: string, variables: Record<string, any>) {
  const response = await fetch(RADMIR_INFO, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const result = await response.json()
  if (result.errors) {
    throw new Error(result.errors.map((e: any) => e.message).join(', '))
  }
  return result.data
}

export async function getPosts(boardId: string, limit = 100, offset = 0) {
  const query = `
    query GetPosts($boardId: ID!, $limit: Int, $offset: Int) {
      posts(boardId: $boardId, limit: $limit, offset: $offset) {
        id
        title
        text
        createdAt
      }
    }
  `

  const data = await graphqlRequest(query, { boardId, limit, offset })
  return data.posts
}

export async function createPost(input: {
  boardId: string
  title: string
  text: string
  hashIp: string
}) {
  const mutation = `
    mutation CreatePost($input: CreatePostInput!) {
      createPost(input: $input) {
        id
        title
        text
        createdAt
      }
    }
  `
  const data = await graphqlRequest(mutation, { input })
  return data.createPost
}

export async function deletePost(postId: string) {
  const mutation = `
    mutation DeletePost($id: ID!) {
      deletePost(id: $id)
    }
  `
  const data = await graphqlRequest(mutation, { id: postId })
  return data.deletePost
}

export async function getBoards(boardId: string) {
  const query = `
    query GetBoards($id: ID!) {
      board(id: $id) {
        id
        name
      }
    }
  `
  const data = await graphqlRequest(query, { id: boardId })
  return data.board
}

export async function getComments(postId: string) {
  const query = `
    query GetComments($postId: ID!) {
      comments(postId: $postId) {
        id
        text
        hashIp
        createdAt
        deletedAt
      }
    }
  `

  const data = await graphqlRequest(query, { postId })
  return data.comments
}

export async function createComment(input: { postId: string; text: string; hashIp: string }) {
  const mutation = `
    mutation CreateComment($input: CreateCommentInput!) {
      createComment(input: $input) {
        id
        text
        hashIp
        createdAt
      }
    }
  `
  const data = await graphqlRequest(mutation, { input })
  return data.createComment
}

export async function deleteComment(commentId: string) {
  const mutation = `
    mutation DeleteComment($id: ID!) {
      deleteComment(id: $id)
    }
  `
  const data = await graphqlRequest(mutation, { id: commentId })
  return data.deleteComment
}

// const variables = {
//   boardId: String(boardId),
//   limit: Number(limit),
//   offset: Number(offset),
// }

// const response = await fetch(RADMIR_INFO, {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({
//     query,
//     variables,
//   }),
// })
// const result = await response.json()
// return result.data.posts
