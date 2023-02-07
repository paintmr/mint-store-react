import { combineReducers } from "redux";
import productReducer from './projucts'

const entityReducer = combineReducers({
  products: productReducer
})

export default entityReducer