import { useParams, useNavigate } from 'react-router'
import { skipToken } from '@reduxjs/toolkit/query/react'
import { useDispatch, useSelector } from 'react-redux'

import { useAppSelector } from './redux/store'
import { addToCart, removeFromCart } from './redux/cartSlice'
import { useGetPostQuery } from './redux/apiSlice'

const Product = () => {
  const cartIDs = useAppSelector((state) => state.cart.cartIDs)
  const { productId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    data: product,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetPostQuery(Number(productId))

  console.log(cartIDs)

  let content
  if (isLoading) {
    content = <div>Loading...</div>
  } else if (isSuccess) {
    content = (
      <div>
        <img src={product.image} alt='' style={{ maxHeight: '20rem' }} />
        <div>
          <p>{product.title}</p>
          <p>{product.description}</p>
        </div>
        <div>
          {!cartIDs.includes(Number(product?.id)) ? (
            <button onClick={() => dispatch(addToCart(product.id))}>
              In Cart
            </button>
          ) : (
            <button onClick={() => dispatch(removeFromCart(product.id))}>
              Remove
            </button>
          )}
        </div>
      </div>
    )
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  return (
    <>
      <button onClick={() => navigate(-1)} style={{ height: '1.5rem' }}>
        Go back
      </button>
      {content}
    </>
  )
}

export default Product
