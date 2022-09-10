/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { useGetPostQuery } from '../../redux/apiSlice'
import { addToCart, removeFromCart } from '../../redux/cartSlice'
import { useAppSelector } from '../../redux/store'
import './CartItems.css'

const CartItems = () => {
  const cartIDs = useAppSelector((state) => state.cart.cartIDs)
  const uniqCartIDs = Array.from(new Set(cartIDs))

  return (
    <div className='cart-container'>
      {uniqCartIDs.map((id) => (
        <CartItem id={id} />
      ))}
    </div>
  )
}
const CartItem = ({ id }: { id: number }) => {
  const [quantity, setQuanity] = useState()
  const dispatch = useDispatch()
  const cartIDs = useAppSelector((state) => state.cart.cartIDs)
  const navigate = useNavigate()

  const {
    data: product,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetPostQuery(Number(id))

  return (
    <div className='cart-item'>
      <div className='cart-image-container'>
        <div>
          <img
            onClick={() => navigate(`/products/${id}`)}
            src={product?.image}
            alt='product'
          />
        </div>
      </div>

      <div className=''>
        <div className=''>
          <p title={product?.title}>{product?.title}</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className='cart-buttons-container'>
            <button onClick={() => dispatch(addToCart(id))}>+</button>
            <p>{cartIDs.filter((cid) => cid === id).length}</p>
            <button onClick={() => dispatch(removeFromCart(id))}>-</button>
          </div>
          <div className=''>
            <p>
              $
              {product?.price &&
                (
                  product?.price * cartIDs.filter((cid) => cid === id).length
                ).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItems
