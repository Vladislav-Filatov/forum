import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'
import { RADMIR_INFO } from '@/constants/api'
import { gql } from '@apollo/client/core'

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
