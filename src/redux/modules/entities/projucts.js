export const entityProducts = {
  entityName: 'products',
  id: 'id'
}

const productReducer = (state = {}, action) => {
  if (action.fetchedData && action.fetchedData.products) {
    return {
      ...state,
      ...action.fetchedData.products
    }
  }
  return state
}

export default productReducer