import { combineReducers } from "redux";
import entityReducer from "./entities";
import homeReducer from './home'
import appReducer from "./app";
import productDetailPage from "./productdetails";
import searchReducer from "./search";
import loginReducer from "./login"
import userCentreReducer from "./usercentre";
import purchaseReducer from "./purchase";

const rootReducer = combineReducers({
  entities: entityReducer,
  home: homeReducer,
  app: appReducer,
  productDetailPage,
  search: searchReducer,
  login: loginReducer,
  userCentre: userCentreReducer,
  purchase: purchaseReducer,
})

export default rootReducer