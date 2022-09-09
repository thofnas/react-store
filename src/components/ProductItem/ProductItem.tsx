import { FC } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'

import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'

import { addToCart, removeFromCart } from '../../redux/cartSlice'
import { useAppSelector } from '../../redux/store'
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
  const { id, title, price, description, category, image, rating } = product
  const cartIDs = useAppSelector((state) => state.cart.cartIDs)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const addToCartHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    dispatch(addToCart(id))
  }

  const removeFromCartHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    dispatch(removeFromCart(id))
  }

  return (
    <div onClick={() => navigate(`/products/${id}`)} className='product-item'>
      <div className='item-container item-container-image'>
        <div>
          <img src={image} alt='product' />
        </div>
        <div className='rating-container'>
          <StarRateRoundedIcon />
          <p>{rating.rate}</p>
        </div>
      </div>
      <div className='item-container-info'>
        <p title={title}>{title}</p>
      </div>
      <div className='item-container-bottom'>
        <div className='item-cart-button'>
          {cartIDs.includes(Number(id)) ? (
            <button onClick={(e) => removeFromCartHandler(e)}>
              Remove From <ShoppingCartOutlinedIcon fontSize='small' />
            </button>
          ) : (
            <button onClick={(e) => addToCartHandler(e)}>
              Add to <ShoppingCartOutlinedIcon fontSize='small' />
            </button>
          )}
        </div>
        <div className='price-item'>
          <p>${price}</p>
        </div>
      </div>
    </div>
  )
}

export default ProductItem
