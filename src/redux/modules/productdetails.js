import { entityProducts } from './entities/products'
import { entityShops } from './entities/shops'
import url from '../../utils/url'
import { combineReducers } from 'redux'
import { getProductWithDetailsByIdSelector } from './entities/products'
import { getShopByIdSelector } from './entities/shops'

const initialstate = {
  productdetails: {
    isFetching: false,
    id: null
  },
  shop: {
    isFetching: false,
    id: null
  }
}

// action types
const types = {
  FETCH_PRODUCTDETAILS_REQUEST: "FETCH_PRODUCTDETAILS_REQUEST",
  FETCH_PRODUCTDETAILS_SUCCESS: "FETCH_PRODUCTDETAILS_SUCCESS",
  FETCH_PRODUCTDETAILS_FAILURE: "FETCH_PRODUCTDETAILS_FAILURE",

  FETCH_SHOPDETAILS_REQUEST: "FETCH_SHOPDETAILS_REQUEST",
  FETCH_SHOPDETAILS_SUCCESS: "FETCH_SHOPDETAILS_SUCCESS",
  FETCH_SHOPDETAILS_FAILURE: "FETCH_SHOPDETAILS_FAILURE",
}

// action group creators (acctions processed by redux/middleware/dataFetching.js）
const fetchProductDetails = (url) => {
  return {
    FETCH_DATA: {
      types: [
        types.FETCH_PRODUCTDETAILS_REQUEST,
        types.FETCH_PRODUCTDETAILS_SUCCESS,
        types.FETCH_PRODUCTDETAILS_FAILURE
      ],
      url,
      entityInfo: entityProducts
    }
  }
}

const fetchShopDetails = (url) => {
  return {
    FETCH_DATA: {
      types: [
        types.FETCH_SHOPDETAILS_REQUEST,
        types.FETCH_SHOPDETAILS_SUCCESS,
        types.FETCH_SHOPDETAILS_FAILURE
      ],
      url,
      entityInfo: entityShops
    }
  }
}

// action creators to dispatch fetch-related actions
export const productDetailsRequest = (id) => {
  return (dispatch, getState) => {
    dispatch(fetchProductDetails(url.getProductDetails(id)))
  }
}

export const shopDetailsRequest = () => {
  return (dispatch, getState) => {
    const product = getProductDetailsSelector(getState())
    const shopId = product.nearestShop
    const shopurl = url.getShop(shopId)
    dispatch(fetchShopDetails(shopurl))
  }
}


// reducers
const productDetailsReducer = (state = initialstate.productdetails, action) => {
  switch (action.type) {
    case types.FETCH_PRODUCTDETAILS_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case types.FETCH_PRODUCTDETAILS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        id: action.fetchedData.ids[0]
      };
    case types.FETCH_PRODUCTDETAILS_FAILURE:
      return {
        ...state,
        isFetching: false,
        id: null
      };
    default:
      return state
  }
}

const shopReducer = (state = initialstate.productdetails, action) => {
  switch (action.type) {
    case types.FETCH_SHOPDETAILS_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case types.FETCH_SHOPDETAILS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        id: action.fetchedData.ids[0]
      };
    case types.FETCH_SHOPDETAILS_FAILURE:
      return {
        ...state,
        isFetching: false,
        id: null
      };
    default:
      return state
  }
}

const productDetailPage = combineReducers({
  productDetails: productDetailsReducer,
  shop: shopReducer
})

export default productDetailPage

// selectors

export const getProductDetailsSelector = (state) => {
  const id = state.productDetailPage.productDetails.id
  return getProductWithDetailsByIdSelector(state, id)
}

export const getShopSelector = (state) => {
  const id = state.productDetailPage.shop.id
  return getShopByIdSelector(state, id)
}