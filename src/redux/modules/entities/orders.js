import { types } from "../usercentre"
import { purchaseTypes } from "../purchase"

export const entityOrders = {
  entityName: 'orders',
  id: 'id'
}

export const orderCategories = {
  ALL: 0,
  AVAILABLE: 1,
  COMPLETED: 2,
  REFUND: 3,
}

const orderReducer = (state = {}, action) => {
  if (action.fetchedData && action.fetchedData.orders) {
    return {
      ...state,
      ...action.fetchedData.orders
    }
  }
  switch (action.type) {
    case types.DELETE_ORDER_CONFIRM:
      // If the use has confirmed to delete an order, delete the order.
      const { [action.orderId]: orderTobeDeleted, ...restOrders } = state
      return restOrders
    case types.COMMENT_ORDER_SUMBIT:
      // If the user has added a comment, add the comment ID to its corresponding order 
      const { newCommentObj, orderId } = action
      const order = state[orderId]
      order.commentId = newCommentObj.commentId
      return {
        ...state,
        [orderId]: order
      }
    case purchaseTypes.SUBMIT_ORDER_SUCCESS:
      const { newOrder } = action
      const { id } = newOrder
      return {
        [id]: newOrder,
        ...state
      }
    default:
      return state
  }
}

export default orderReducer

// selectors
export const getOrderById = (state, id) => {
  return state.entities.orders[id]
}

export const getAllOrdersSelector = (state) => {
  return state.entities.orders
}