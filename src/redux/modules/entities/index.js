import { combineReducers } from "redux";
import productReducer from './products'
import shopReducer from "./shops";
import keywordReducer from "./keywords";
import orderReducer from "./orders";

const entityReducer = combineReducers({
  products: productReducer,
  shops: shopReducer,
  keywords: keywordReducer,
  orders: orderReducer
})

export default entityReducer