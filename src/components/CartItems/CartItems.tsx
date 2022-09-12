/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { useGetPostQuery } from '../../redux/apiSlice'
import { addToCart, removeFromCart, clearCart } from '../../redux/cartSlice'
import { useAppSelector } from '../../redux/store'
import CloseIcon from '@mui/icons-material/Close'
import './CartItems.css'
import { margin } from '@mui/system'

const CartItems = () => {
  const cartIDs = useAppSelector((state) => state.cart.cartIDs)
  const dispatch = useDispatch()
  const uniqCartIDs = Array.from(new Set(cartIDs))

  return (
    <div className='cart-wrapper'>
      <button
        style={{
          border: 'none',
          padding: '0.8rem 1.3rem',
          position: 'absolute',
          cursor: 'pointer',
          top: 0,
          right: 0
        }}
        onClick={() => dispatch(clearCart())}
      >
        <CloseIcon fontSize='small' />
      </button>
      <div className='cart-container'>
        <div className='' style={{ paddingTop: '2.5rem' }}>
          {uniqCartIDs.map((id) => (
            <CartItem key={id} id={id} />
          ))}
        </div>
      </div>
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

      <div className='cart-info-container'>
        <div
          className='cart-item-title'
          onClick={() => navigate(`/products/${id}`)}
        >
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
