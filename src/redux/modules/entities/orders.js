import { types } from "../usercentre"
export const entityOrders = {
  entityName: 'orders',
  id: 'id'
}

export const orderTypes = {
  ALL: 0,
  TO_BE_PAID: 1,
  COMPLETED: 2,
  REFUND: 3,
}

const orderReducer = (state = {}, action) => {
  if (action.fetchedData && action.fetchedData.orders) {
    return {
      ...state,
      ...action.fetchedData.orders
    }
  } else if (action.type === types.DELETE_ORDER_CONFIRM) {
    // If the use has confirmed to delete an order, delete the order.
    const { [action.orderId]: orderTobeDeleted, ...restOrders } = state
    return restOrders
  } else if (action.type === types.COMMENT_ORDER_SUMBIT) {
    // If the user has added a comment, add the comment ID to its corresponding order 
    const { newCommentObj, orderId } = action
    const order = state[orderId]
    order.commentId = newCommentObj.commentId
    return {
      ...state,
      [orderId]: order
    }
  }
  return state
}

export default orderReducer

// selectors
export const getOrderById = (state, id) => {
  return state.entities.orders[id]
}