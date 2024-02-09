import {  configureStore } from '@reduxjs/toolkit'
import cartReducer from './Reducers/CartReducer'
import { rootReducer } from './rootReducer'

export const store = configureStore({
    reducer: rootReducer
  })