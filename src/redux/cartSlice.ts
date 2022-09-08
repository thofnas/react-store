import { createSlice } from '@reduxjs/toolkit'

interface ICartList {
  cartIDs: number[]
}

const initialState: ICartList = {
  cartIDs: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartIDs = [...state.cartIDs, action.payload]
    },
    removeFromCart: (state, action) => {
      const index = state.cartIDs.indexOf(action.payload)
      if (index > -1) {
        // only splice array when id is found
        state.cartIDs.splice(index, 1) // 2nd parameter means remove one item only
      }
    },
    clearCart: (state) => {
      state.cartIDs = []
    }
  }
})

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions

export default cartSlice.reducer
