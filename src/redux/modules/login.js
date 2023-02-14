const initialState = {
  isLogining: false,
  userName: localStorage.getItem("userName") || '',
  password: '',
  loginStatus: localStorage.getItem("loginStatus") || false
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
    const { userName, password, loginStatus } = getState().login
    if (!(userName && userName.length > 0 && password && password.length > 0)) {
      dispatch({ type: types.LOGIN_FAILURE, error: 'Please enter username and password.' })
    }
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        localStorage.setItem('userName', userName)
        localStorage.setItem('loginStatus', loginStatus)
        dispatch({ type: types.LOGIN_SUCCESS })
        resolve()
      }, 500)
    })
  }
}

export const logout = () => {
  localStorage.removeItem('userName')
  localStorage.removeItem('loginStatus')
  return { type: types.LOGOUT }
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
        loginStatus: true
      }
    case types.LOGIN_FAILURE:
      return {
        ...state,
        isLogining: false
      }
    case types.LOGOUT:
      return {
        ...state,
        userName: '',
        password: '',
        loginStatus: false
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

export const loginStatusSelector = (state) => {
  return state.login.loginStatus
}

export const loginMobileSelector = (state) => {
  return state.login.userName
}