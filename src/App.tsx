import { useGetPostsQuery } from './redux/apiSlice'
import ProductItem from './ProductItem'

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

export default () => {
  const {
    data: products,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetPostsQuery()
  console.log(products)

  let content

  if (isLoading) {
    content = <div>Loading...</div>
  } else if (isSuccess && Array.isArray(products)) {
    content = products.map((product: Product) => (
      <ProductItem key={product.id} product={product}></ProductItem>
    ))
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  return <div className='App'>{content}</div>
}
