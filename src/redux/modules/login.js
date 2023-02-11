const initialState = {
  isLogining: false,
  userName: '',
  password: '',
  login: false
}

// action types
const types = {
  SET_USERNAME: "LOGIN/SET_USERNAME",
  SET_PASSWORD: "LOGIN/SET_PASSWORD",

  LOGIN_REQUEST: "LOGIN_REQUEST",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN_FAILURE",

  LOGOUT: "LOGOUT"
}

// actions
export const setUserName = (userName) => ({
  type: types.SET_USERNAME,
  userName
})

export const setPassword = (password) => ({
  type: types.SET_PASSWORD,
  password
})

export const login = () => {
  return (dispatch, getState) => {
    dispatch({ type: types.LOGIN_REQUEST })
    const { userName, password } = getState().login
    if (!(userName && userName.length > 0 && password && password.length > 0)) {
      dispatch({ type: types.LOGIN_FAILURE, error: 'Please enter username and password.' })
    }
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        dispatch({ type: types.LOGIN_SUCCESS })
        resolve()
      }, 500)
    })
  }
}

// reducer
const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USERNAME:
      return {
        ...state,
        userName: action.userName
      }
    case types.SET_PASSWORD:
      return {
        ...state,
        password: action.password
      }
    case types.LOGIN_REQUEST:
      return {
        ...state,
        isLogining: true
      }
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isLogining: false,
        login: true
      }
    case types.LOGIN_REQUEST:
      return {
        ...state,
        isLogining: false
      }
    case types.LOGOUT:
      return {
        ...state,
        userName: '',
        password: '',
        login: false
      }
    default:
      return state
  }

}

export default loginReducer

// selectors
export const userNameSelector = (state) => {
  return state.login.userName
}

export const passwordSelector = (state) => {
  return state.login.password
}