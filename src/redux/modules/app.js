const initialState = {
  popUpMessage: '',
}

// action types
const types = {
  CLEAR_POP_UP_MESSAGE: 'CLEAR_POP_UP_MESSAGE'
}

// action creators
export const clearPopUpMessage = () => {
  return {
    type: types.CLEAR_POP_UP_MESSAGE
  }
}

// reducers
const appReducer = (state = initialState, action) => {
  if (action.error) {
    return {
      ...state,
      popUpMessage: action.error
    }
  } else if (action.successMessage) {
    return {
      ...state,
      popUpMessage: action.successMessage
    }
  } else if (action.type === types.CLEAR_POP_UP_MESSAGE) {
    return {
      ...state,
      popUpMessage: ''
    }
  }
  return state
}
export default appReducer

// selectors
export const popUpMessageSelector = state => {
  return state.app.popUpMessage
}
