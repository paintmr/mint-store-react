import url from "../../utils/url"
import { entityProducts } from "./entities/products"
import { combineReducers } from "redux"
import { getProductByIdSelector } from "./entities/products"

// initial state for Home
const initialState = {
  discountProducts: {
    isFetching: false,
    ids: []
  },
  recommendedProducts: {
    isFetching: false,
    ids: [],
    pageCount: 0
  }
}

// action types
export const types = {
  FETCH_DISCOUNTS_REQUEST: "HOME/FETCH_DISCOUNTS_REQUEST",
  FETCH_DISCOUNTS_SUCCESS: "HOME/FETCH_DISCOUNTS_SUCCESS",
  FETCH_DISCOUNTS_FAILURE: "HOME/FETCH_DISCOUNTS_FAILURE",

  FETCH_RECOMMENDED_REQUEST: "HOME/FETCH_RECOMMENDED_REQUEST",
  FETCH_RECOMMENDED_SUCCESS: "HOME/FETCH_RECOMMENDED_SUCCESS",
  FETCH_RECOMMENDED_FAILURE: "HOME/FETCH_RECOMMENDED_FAILURE"
}

// action group creators  These actions are processed by reudx/middleware/dataFetching.js
const fetchDiscounts = (url) => {
  return {
    FETCH_DATA: {
      types: [
        types.FETCH_DISCOUNTS_REQUEST,
        types.FETCH_DISCOUNTS_SUCCESS,
        types.FETCH_DISCOUNTS_FAILURE
      ],
      url,
      entityInfo: entityProducts
    }
  }
}

const fetchRecommended = (url) => {
  return {
    FETCH_DATA: {
      types: [
        types.FETCH_RECOMMENDED_REQUEST,
        types.FETCH_RECOMMENDED_SUCCESS,
        types.FETCH_RECOMMENDED_FAILURE
      ],
      url,
      entityInfo: entityProducts
    }
  }
}


// action creators   Data-fetching actions are processed by redux/middleware/dataFetching
export const discountsReqest = () => {
  return (dispatch, getState) => {
    // If data have been fetched, there is no need to dispatch any action.
    const { ids } = getState().home.discounts
    if (ids.length > 0) {
      return null
    }
    dispatch(fetchDiscounts(url.getDiscounts()))
  }
}

export const params = {
  PAGE_SIZE_RECOMMENDED: 5
}

export const recommendedRequest = () => {
  return (dispatch, getState) => {
    const { pageCount } = getState().home.recommended
    const rowIndex = pageCount * params.PAGE_SIZE_RECOMMENDED
    const fetchURL = url.getRecommended(rowIndex, pageCount)
    dispatch(fetchRecommended(fetchURL))
  }
}

// reducers
const discountReducer = (state = initialState.discountProducts, action) => {
  switch (action.type) {
    case types.FETCH_DISCOUNTS_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case types.FETCH_DISCOUNTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ids: state.ids.concat(action.fetchedData.ids)
      };
    case types.FETCH_DISCOUNTS_FAILURE:
      // The error part of the failure action type of any Component is dealed by redux/modules/app.js
      return {
        ...state,
        isFetching: false
      };
    default:
      return state
  }
}

const recommendedReducer = (state = initialState.recommendedProducts, action) => {
  switch (action.type) {
    case types.FETCH_RECOMMENDED_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case types.FETCH_RECOMMENDED_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ids: state.ids.concat(action.fetchedData.ids),
        pageCount: state.pageCount + 1
      };
    case types.FETCH_RECOMMENDED_FAILURE:
      // The error part of the failure action type of any Component is dealed by redux/modules/app.js
      return {
        ...state,
        isFetching: false
      };
    default:
      return state
  }
}

const homeReducer = combineReducers({
  discounts: discountReducer,
  recommended: recommendedReducer
})

export default homeReducer

// selectors
// The ids of products are stored in redux/modules/home.js, while the product object is stored in redux/modules/entities/products.js
export const discountsSelector = state => {
  return state.home.discounts.ids.map(id => {
    return getProductByIdSelector(state, id)
  })
}

export const recommendedSelector = state => {
  return state.home.recommended.ids.map(id => {
    return getProductByIdSelector(state, id)
  })
}

export const rmdPageCountSelector = state => {
  return state.home.recommended.pageCount
}

export const rmdIsFetchingSelector = state => {
  return state.home.recommended.isFetching
}