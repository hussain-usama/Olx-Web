import { combineReducers } from "redux";
import cartReducer from "./Reducers/CartReducer";

export const rootReducer = combineReducers({
   cartSlice : cartReducer.reducer
})