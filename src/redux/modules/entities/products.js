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

// selectors
export const getProductByIdSelector = (state, id) => {
  return state.entities.products[id]
}

export const getProductWithDetailsByIdSelector = (state, id) => {
  const product = state.entities.products[id]
  if (product && product.detail && product.purchaseNotes) {
    return product
  } else {
    return null
  }
} 