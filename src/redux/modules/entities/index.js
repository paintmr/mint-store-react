import { combineReducers } from "redux";
import productReducer from './products'
import shopReducer from "./shops";
import keywordReducer from "./keywords";

const entityReducer = combineReducers({
  products: productReducer,
  shops: shopReducer,
  keywords: keywordReducer
})

export default entityReducer