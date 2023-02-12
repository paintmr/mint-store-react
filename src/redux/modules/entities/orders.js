export const entityOrders = {
  entityName: 'orders',
  id: 'id'
}

export const orderTypes = {
  ALL: 0,
  TO_BE_PAID: 1,
  AVAILABLE: 2,
  REFUND: 3,
}

const orderReducer = (state = {}, action) => {
  if (action.fetchedData && action.fetchedData.orders) {
    return {
      ...state,
      ...action.fetchedData.orders
    }
  }
  return state
}

export default orderReducer

// selectors
export const getOrderById = (state, id) => {
  return state.entities.orders[id]
}