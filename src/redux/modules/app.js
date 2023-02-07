const initialState = {
  error: ''
}

// action types
const types = {
  CLEAR_ERROR: 'CLEAR_ERROR'
}

// action creators
export const clearError = () => {
  return {
    type: types.CLEAR_ERROR
  }
}



// reducers
const appReducer = (state = initialState, action) => {
  if (action.error) {
    return {
      ...state,
      error: action.error
    }
  }
  else if (action.type === types.CLEAR_ERROR) {
    return {
      ...state,
      error: ''
    }
  }
  return state
}
export default appReducer

// selectors
export const errorSelector = state => {
  return state.app.error
}
