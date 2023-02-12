import { entityOrders } from "./entities/orders"
import url from "../../utils/url"
import { orderTypes } from "./entities/orders"
import { getOrderById } from "./entities/orders"

const initialState = {
  orders: {
    isFetching: false,
    idsAll: [],
    idsToBePaid: [],
    idsAvailable: [],
    idsRefund: []
  },
  tabIndex: 0

}

// action types
const types = {
  FETCH_ORDERS_REQUEST: 'FETCH_ORDERS_REQUEST',
  FETCH_ORDERS_SUCCESS: 'FETCH_ORDERS_SUCCESS',
  FETCH_ORDERS_FAILURE: 'FETCH_ORDERS_REQUEST',

  CHANGE_TAB: 'CHANGE_TAB'
}

// action groups for middleware/dataFetching.js to process
const fetchOrders = (url) => {
  return {
    FETCH_DATA: {
      types: [
        types.FETCH_ORDERS_REQUEST,
        types.FETCH_ORDERS_SUCCESS,
        types.FETCH_ORDERS_FAILURE
      ],
      url,
      entityInfo: entityOrders
    }
  }
}

// action creators
export const ordersReqest = () => {
  return (dispatch, getState) => {
    dispatch(fetchOrders(url.getOrders()))
  }
}

export const changeTab = (index) => {
  return {
    type: types.CHANGE_TAB,
    index
  }
}

// reducers
const userCentreReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_ORDERS_REQUEST:
      return {
        ...state,
        orders: {
          ...state,
          isFetching: true
        }
      }
    case types.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: {
          isFetching: false,
          ids: [...action.fetchedData.ids]
        }
      }
    case types.CHANGE_TAB:
      return {
        ...state,
        tabIndex: action.index
      }
    default:
      return state
  }

}

export default userCentreReducer

// selectors
export const tabIndexSelector = (state) => {
  return state.userCentre.tabIndex
}
export const ordersSelector = (state) => {
  const tabIndex = tabIndexSelector(state)
  const ids = state.userCentre.orders.ids
  if (ids) {
    const orders = ids.map(id => { return getOrderById(state, id) })

    switch (tabIndex) {
      case orderTypes.ALL:
        return orders
      case orderTypes.TO_BE_PAID:
        return orders.filter(order => {
          if (order.type === orderTypes.TO_BE_PAID) {
            return true
          }
          return false
        })
      case orderTypes.AVAILABLE:
        return orders.filter(order => {
          if (order.type === orderTypes.AVAILABLE) {
            return true
          }
          return false
        })
      default:
        return null
    }
  }
}