import { combineReducers } from "redux";
import entityReducer from "./entities";
import homeReducer from './home'
import appReducer from "./app";
import productDetailPage from "./productdetails";
import searchReducer from "./search";

const rootReducer = combineReducers({
  entities: entityReducer,
  home: homeReducer,
  app: appReducer,
  productDetailPage,
  search: searchReducer
})

export default rootReducer