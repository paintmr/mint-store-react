import { combineReducers } from "redux";
import entityReducer from "./entities";
import homeReducer from './home'
import appReducer from "./app";

const rootReducer = combineReducers({
  entities: entityReducer,
  home: homeReducer,
  app: appReducer
})

export default rootReducer