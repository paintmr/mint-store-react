import { getProductWithDetailsByIdSelector } from "./entities/products"
import { loginMobileSelector } from "./login"
import { nanoid } from "nanoid"

const initialState = {
  quantity: 1,
  isSubmitting: false
}

// action purchaseTypes
export const purchaseTypes = {
  SET_QUANTITY: 'SET_QUANTITY',
  DECREASE: 'DECREASE',
  INCREASE: 'INCREASE',
  GET_PRODUCT: 'GET_PRODUCT',

  SUBMIT_ORDER_REQUEST: 'SUBMIT_ORDER_REQUEST',
  SUBMIT_ORDER_SUCCESS: 'SUBMIT_ORDER_SUCCESS',
  SUBMIT_ORDER_FAILURE: 'SUBMIT_ORDER_FAILURE'


}

// action creators
export const setQuantity = (quantity) => {
  return { type: purchaseTypes.SET_QUANTITY, quantity }
}

export const decrease = () => {
  return { type: purchaseTypes.DECREASE }
}

export const increase = () => {
  return { type: purchaseTypes.INCREASE }
}

export const submitOrder = (productId) => {
  return (dispatch, getState) => {
    dispatch({ type: purchaseTypes.SUBMIT_ORDER_REQUEST })
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const product = productSelector(getState(), productId)
        const { quantity } = getState().purchase
        const { currentPrice } = product
        const text1 = `${quantity} coupons | price: $${currentPrice * quantity}`
        const text2 = `valid untill December 26`

        const newOrder = {
          id: nanoid(),
          statusText: "AVAILABLE",
          orderPicUrl: product.picture,
          channel: "Group Buying",
          title: product.shop,
          text: [text1, text2],
          type: 1
        }
        dispatch({ type: purchaseTypes.SUBMIT_ORDER_SUCCESS, newOrder, successMessage: 'Successfully placed an order.' })
        // the action SUBMIT_ORDER_SUCCESS will be processed by the producers in purchase.js, usercentre.js, entities/orders.js, app.js
      }, 500)
    })
  }
}

// reducers
const purchaseReducer = (state = initialState, action) => {
  switch (action.type) {
    case purchaseTypes.SET_QUANTITY:
      return {
        ...state,
        quantity: action.quantity
      }
    case purchaseTypes.DECREASE:
      return {
        ...state,
        quantity: state.quantity - 1
      }
    case purchaseTypes.INCREASE:
      return {
        ...state,
        quantity: state.quantity + 1
      }
    case purchaseTypes.SUBMIT_ORDER_REQUEST:
      return {
        ...state,
        isSubmitting: true
      }
    case purchaseTypes.SUBMIT_ORDER_SUCCESS:
      return {
        ...state,
        isSubmitting: false
      }
    default:
      return state
  }
}

export default purchaseReducer

// selectors
export const quantitySelector = (state) => {
  const { quantity } = state.purchase
  if (quantity) {
    return quantity
  }
  return ''
}

export const productSelector = (state, productId) => {
  return getProductWithDetailsByIdSelector(state, productId)
}

export const getLoginMobileSelector = (state) => {
  return loginMobileSelector(state)
}