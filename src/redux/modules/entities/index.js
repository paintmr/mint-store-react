import { combineReducers } from "redux";
import productReducer from './products'
import shopReducer from "./shops";

const entityReducer = combineReducers({
  products: productReducer,
  shops: shopReducer
})

export default entityReducer