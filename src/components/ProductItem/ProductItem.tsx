import { FC } from 'react'
import { useNavigate } from 'react-router'

import './ProductItem.css'

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

interface ProductItemProps {
  product: Product
}

const ProductItem: FC<ProductItemProps> = ({ product }) => {
  const navigate = useNavigate()
  const { id, title, price, description, category, image, rating } = product
  return (
    <div onClick={() => navigate(`/products/${id}`)} className='product-item'>
      <div className='item-container'>
        <img src={image} alt='product' />
      </div>
      <div className='item-container'>
        <p>{title}</p>
        <p>{price}</p>
        <p>{category}</p>
        <p>{rating.rate}</p>
      </div>
    </div>
  )
}

export default ProductItem
