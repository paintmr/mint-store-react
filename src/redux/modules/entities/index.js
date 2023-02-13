import { combineReducers } from "redux";
import productReducer from './products'
import shopReducer from "./shops";
import keywordReducer from "./keywords";
import orderReducer from "./orders";
import commentReducer from "./comments";

const entityReducer = combineReducers({
  products: productReducer,
  shops: shopReducer,
  keywords: keywordReducer,
  orders: orderReducer,
  comments: commentReducer
})

export default entityReducer