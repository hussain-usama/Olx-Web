import { createSlice, configureStore } from '@reduxjs/toolkit'

const cartReducer = createSlice({
    name: 'cartReducer',
    initialState: {
      cartList:[]
    },
    reducers: {
      setCartList: (state,action) => {
        let temp=[...state.cartList]
        temp.push(action.payload)
        state.cartList=temp
      },
      removeCartItem: (state,action) => {
        let removedItem=action.payload
        let findIndex = state.cartList.findIndex(x=>x.id===removedItem?.id)
        let temp=[...state.cartList]
        temp.splice(findIndex,1)
        state.cartList=temp
      }
    }
  })
  
  export const { setCartList , removeCartItem} = cartReducer.actions

  export default cartReducer