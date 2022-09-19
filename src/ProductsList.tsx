/* eslint-disable react-hooks/rules-of-hooks */
import { useSearchParams } from 'react-router-dom'
import { skipToken } from '@reduxjs/toolkit/query/react'

import {
  useGetPostsQuery,
  useGetPostsWithCategoryQuery
} from './redux/apiSlice'
import ProductItem from './components/ProductItem/ProductItem'

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

export default function ProductsList() {
  const [searchParams] = useSearchParams()

  let {
    data: products,
    isLoading,
    isSuccess,
    isError,
    error
  } = searchParams.get('category')
    ? useGetPostsWithCategoryQuery(searchParams.get('category') ?? skipToken, {
        refetchOnFocus: true
      })
    : useGetPostsQuery(undefined, { refetchOnFocus: true })

  let content

  if (isLoading) {
    content = <div>Loading...</div>
  } else if (isSuccess && Array.isArray(products)) {
    content = products.map((product: Product) => (
      <ProductItem key={product.id} product={product}></ProductItem>
    ))
  } else if (isError) {
    content = <div>{error?.toString()}</div>
  }
  return (
    <div style={{ width: '100%' }}>
      <div className='product-list'>{content}</div>
    </div>
  )
}
