import { combineReducers } from "redux";
import entityReducer from "./entities";
import homeReducer from './home'
import appReducer from "./app";
import productDetailPage from "./productdetails";

const rootReducer = combineReducers({
  entities: entityReducer,
  home: homeReducer,
  app: appReducer,
  productDetailPage
})

export default rootReducer