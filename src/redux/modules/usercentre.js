import { entityOrders } from "./entities/orders"
import url from "../../utils/url"
import { orderTypes } from "./entities/orders"
import { getOrderById } from "./entities/orders"

const initialState = {
  orders: {
    isFetching: false,
    ids: []
  },
  tabIndex: 0,
  deletingOrder: {
    isDeleting: false,
    id: null
  }
}

// action types
export const types = {
  FETCH_ORDERS_REQUEST: 'FETCH_ORDERS_REQUEST',
  FETCH_ORDERS_SUCCESS: 'FETCH_ORDERS_SUCCESS',
  FETCH_ORDERS_FAILURE: 'FETCH_ORDERS_REQUEST',

  CHANGE_TAB: 'CHANGE_TAB',

  DELETE_ORDER_REQUEST: 'DELETE_ORDER_REQUEST',
  DELETE_ORDER_CANCEL: 'DELETE_ORDER_CANCEL',
  DELETE_ORDER_CONFIRM: 'DELETE_ORDER_CONFIRM',
  DELETE_ORDER_FAILURE: 'DELETE_ORDER_FAILURE',
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

export const deleteOrderRequest = (id) => {
  return { type: types.DELETE_ORDER_REQUEST, id }
}

export const cancelDeleteOrder = () => {
  return { type: types.DELETE_ORDER_CANCEL }
}

export const confirmDeleteOrder = () => {
  return (dispatch, getState) => {
    const orderId = getState().userCentre.deletingOrder.id
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        dispatch({ type: types.DELETE_ORDER_CONFIRM, orderId })
        resolve()
      }, 500)
    })
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
    case types.DELETE_ORDER_REQUEST:
      return {
        ...state,
        deletingOrder: {
          isDeleting: true,
          id: action.id
        }
      }
    case types.DELETE_ORDER_CANCEL:
      return {
        ...state,
        deletingOrder: {
          isDeleting: false,
          id: null
        }
      }
    case types.DELETE_ORDER_CONFIRM:
      const newIds = state.orders.ids.filter(id => {
        if (id === action.orderId) {
          return false
        }
        return true
      })
      return {
        ...state,
        orders: {
          isFetching: false,
          ids: [...newIds]
        },
        deletingOrder: {
          isDeleting: false,
          id: null
        }
      }
    case types.DELETE_ORDER_FAILURE:
      return {
        ...state,
        deletingOrder: {
          isDeleting: false,
          id: null
        }
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
      case orderTypes.COMPLETED:
        return orders.filter(order => {
          if (order.type === orderTypes.COMPLETED) {
            return true
          }
          return false
        })
      default:
        return null
    }
  }
}

export const deletingOrderStatusSelector = (state) => {
  return state.userCentre.deletingOrder.isDeleting
}
