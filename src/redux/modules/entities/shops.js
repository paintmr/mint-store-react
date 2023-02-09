export const entityShops = {
  entityName: 'shops',
  id: 'id'
}

const shopReducer = (state = {}, action) => {
  if (action.fetchedData && action.fetchedData.shops) {
    return {
      ...state,
      ...action.fetchedData.shops
    }
  }
  return state
}

export default shopReducer

// selectors

export const getShopByIdSelector = (state, id) => {
  return state.entities.shops[id]
}