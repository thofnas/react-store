import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface Rating {
  rate: number
  count: number
}

interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: Rating
}

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com' }),
  endpoints: (builder) => ({
    getPosts: builder.query<Product, void>({
      query: () => '/products'
    }),
    getPost: builder.query<Product, void>({
      query: (id) => `/products/${id}`
    })
  })
})

export const { useGetPostsQuery } = apiSlice
