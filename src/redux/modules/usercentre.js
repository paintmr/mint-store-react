import { entityOrders, orderTypes, getOrderById } from "./entities/orders"
import url from "../../utils/url"
import { combineReducers } from "redux"
import { nanoid } from "nanoid";

const initialState = {
  orders: {
    isFetching: false,
    ids: []
  },
  tabIndex: 0,
  currentOrder: {
    isDeleting: false,
    id: null,
    isCommenting: false,
    comment: '',
    starNum: 0,
    changeCommentingOrder: false,
    nextId: null
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

  COMMENT_ORDER_REQUEST: 'COMMENT_ORDER_REQUEST',
  COMMENT_ORDER_CANCEL: 'COMMENT_ORDER_CANCEL',
  COMMENT_ORDER_SUMBIT: 'COMMENT_ORDER_SUMBIT',
  COMMENT_ORDER_FAILURE: 'COMMENT_ORDER_FAILURE',

  SET_COMMENT_ORDER_TEXT: 'SET_COMMENT_ORDER_TEXT',
  SET_COMMENT_ORDER_STARS: 'SET_COMMENT_ORDER_STARS',
  CHANGE_COMMENTING_ORDER_REQUEST: 'CHANGE_COMMENTING_ORDER_REQUEST',
  CANCEL_CHANGE_COMMENTING_ORDER: 'CANCEL_CHANGE_COMMENTING_ORDER',
  COMFIRM_CHANGE_COMMENTING_ORDER: 'COMFIRM_CHANGE_COMMENTING_ORDER',
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
    const orderId = getState().userCentre.currentOrder.id
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        dispatch({ type: types.DELETE_ORDER_CONFIRM, orderId })
        resolve()
      }, 500)
    })
  }
}

export const commentOrderRequest = (id) => {
  return { type: types.COMMENT_ORDER_REQUEST, id }
}

export const cancelOrderComment = () => {
  return { type: types.COMMENT_ORDER_CANCEL }
}

export const setCommentText = (text) => {
  return { type: types.SET_COMMENT_ORDER_TEXT, text }
}

export const setCommentStars = (starNum) => {
  return { type: types.SET_COMMENT_ORDER_STARS, starNum }
}

export const changeCommentingOrderRequest = (nextId) => {
  return { type: types.CHANGE_COMMENTING_ORDER_REQUEST, nextId }
}


export const cancelChangeCommentingOrder = () => {
  return { type: types.CANCEL_CHANGE_COMMENTING_ORDER }
}

export const confirmChangeCommentingOrder = (nextId) => {
  return { type: types.COMFIRM_CHANGE_COMMENTING_ORDER, nextId }
}

export const submitOrderComment = () => {
  return (dispatch, getState) => {
    const { comment, starNum, id } = getState().userCentre.currentOrder
    const newCommentObj = {
      commentId: nanoid(),
      comment,
      starNum,
    }
    dispatch({ type: types.COMMENT_ORDER_SUMBIT, newCommentObj, orderId: id, successMessage: 'Successfully added a comment.' })
  }
}


// reducers
const ordersReducer = (state = initialState.orders, action) => {
  switch (action.type) {
    case types.FETCH_ORDERS_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case types.FETCH_ORDERS_SUCCESS:
      return {
        isFetching: false,
        ids: [...action.fetchedData.ids]
      }
    case types.FETCH_ORDERS_FAILURE:
      return {
        ...state,
        isFetching: false
      }
    case types.DELETE_ORDER_CONFIRM:
      const newIds = state.ids.filter(id => {
        if (id === action.orderId) {
          return false
        }
        return true
      })
      return {
        ...state,
        ids: [...newIds]
      }
    default:
      return state
  }
}

const tabIndexReducer = (state = initialState.tabIndex, action) => {
  switch (action.type) {
    case types.CHANGE_TAB:
      return action.index
    default:
      return state
  }
}
const currentOrderReducer = (state = initialState.currentOrder, action) => {
  switch (action.type) {
    case types.DELETE_ORDER_REQUEST:
      return {
        isDeleting: true,
        id: action.id
      }
    case types.DELETE_ORDER_CANCEL:
    case types.DELETE_ORDER_FAILURE:
    case types.DELETE_ORDER_CONFIRM:
      return {
        ...state,
        isDeleting: false,
        id: null
      }
    case types.COMMENT_ORDER_REQUEST:
      return {
        ...state,
        isCommenting: true,
        id: action.id,
        comment: '',
        starNum: 0
      }
    case types.COMMENT_ORDER_CANCEL:
    case types.COMMENT_ORDER_SUMBIT:
      return initialState.currentOrder
    case types.SET_COMMENT_ORDER_TEXT:
      return {
        ...state,
        comment: action.text
      }
    case types.SET_COMMENT_ORDER_STARS:
      return {
        ...state,
        starNum: action.starNum
      }
    case types.CHANGE_COMMENTING_ORDER_REQUEST:
      return {
        ...state,
        changeCommentingOrder: true,
        nextId: action.nextId
      }
    case types.CANCEL_CHANGE_COMMENTING_ORDER:
      return {
        ...state,
        changeCommentingOrder: false,
      }
    case types.COMFIRM_CHANGE_COMMENTING_ORDER:
      return {
        ...state,
        changeCommentingOrder: false,
        nextId: null,
        isCommenting: true,
        id: action.nextId,
        comment: '',
        starNum: 0
      }
    default:
      return state
  }

}

const userCentreReducer = combineReducers({
  orders: ordersReducer,
  tabIndex: tabIndexReducer,
  currentOrder: currentOrderReducer
})

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
      case orderTypes.REFUND:
        return orders.filter(order => {
          if (order.type === orderTypes.REFUND) {
            return true
          }
          return false
        })
      default:
        return null
    }
  }
}


export const currentOrderSelector = (state) => {
  return state.userCentre.currentOrder
}