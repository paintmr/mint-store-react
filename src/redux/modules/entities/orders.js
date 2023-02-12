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
    const { [action.orderId]: orderTobeDeleted, ...restOrders } = state
    return restOrders
  }
  return state
}

export default orderReducer

// selectors
export const getOrderById = (state, id) => {
  return state.entities.orders[id]
}