import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import rootReducer from './modules'
// Use dataFetching as part of middleware to process data-fetching actions
import dataFetching from './middleware/dataFetching'

let store

if (process.env.NODE_ENV !== "production" && window.__REDUX_DEVTOOLS_EXTENSION__) {
  const composeEnhancers = window.window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, dataFetching)))
} else {
  store = createStore(rootReducer, applyMiddleware(thunk, dataFetching))
}



export default store