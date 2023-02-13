const initialState = {
  error: '',
  successMessage: ''
}

// action types
const types = {
  CLEAR_ERROR: 'CLEAR_ERROR',
  CLEAR_SUCCESS_MESSAGE: 'CLEAR_SUCCESS_MESSAGE'
}

// action creators
export const clearError = () => {
  return {
    type: types.CLEAR_ERROR
  }
}

export const clearSuccessMessage = () => {
  return {
    type: types.CLEAR_SUCCESS_MESSAGE
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
  else if (action.successMessage) {
    return {
      ...state,
      successMessage: action.successMessage
    }
  }
  else if (action.type === types.CLEAR_SUCCESS_MESSAGE) {
    return {
      ...state,
      successMessage: ''
    }
  }
  return state
}
export default appReducer

// selectors
export const errorSelector = state => {
  return state.app.error
}
export const successMessageSelector = state => {
  return state.app.successMessage
}