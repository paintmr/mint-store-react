import { combineReducers } from "redux";
import entityReducer from "./entities";
import homeReducer from './home'
import appReducer from "./app";
import productDetailPage from "./productdetails";
import searchReducer from "./search";
import loginReducer from "./login"
import userCentreReducer from "./usercentre";

const rootReducer = combineReducers({
  entities: entityReducer,
  home: homeReducer,
  app: appReducer,
  productDetailPage,
  search: searchReducer,
  login: loginReducer,
  userCentre: userCentreReducer
})

export default rootReducer