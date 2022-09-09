/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from 'react'
import { useGetPostQuery } from '../../redux/apiSlice'
import { useAppSelector } from '../../redux/store'

const CartItems = () => {
  const cartIDs = useAppSelector((state) => state.cart.cartIDs)
  const uniqCartIDs = Array.from(new Set(cartIDs))

  return (
    <>
      {uniqCartIDs.map((id) => (
        <CartItem id={id} />
      ))}
    </>
  )
}
const CartItem = ({ id }: { id: number }) => {
  const {
    data: product,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetPostQuery(Number(id))

  return <></>
}

export default CartItems
