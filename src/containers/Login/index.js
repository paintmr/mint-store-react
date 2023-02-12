import React, { Component } from 'react'
import LoginHeader from './LoginHeader'
import LoginForm from './LoginForm'
import { connect } from 'react-redux'
import { userNameSelector, passwordSelector, setUserName, setPassword, login, loginStatusSelector } from '../../redux/modules/login'
import { Redirect } from 'react-router-dom'

class Login extends Component {
  render() {
    const { userName, password, login, loginStatus, location: { state } } = this.props

    // Check the user's login status
    if (loginStatus) {
      // if login, check where has the user been redirected from
      if (state && state.from) {
        // redirect the user to the page before login 
        return <Redirect to={state.from} />
      }
      // if the user has not been redirected, now redirect her to the user centre page 
      return <Redirect to='/usercentre' />
    }
    // if not login, suggest the user login 
    return (
      <div>
        <LoginHeader />
        <LoginForm userName={userName} password={password} onChange={this.handleChange} login={login} />
      </div>
    )
  }

  handleChange = (e) => {
    if (e.target.name === 'userName') {
      this.props.setUserName(e.target.value)
    } else if (e.target.name === 'password') {
      this.props.setPassword(e.target.value)
    }
  }
}

const mapStateToProps = (state) => {
  return {
    userName: userNameSelector(state),
    password: passwordSelector(state),
    loginStatus: loginStatusSelector(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUserName: (userName) => { dispatch(setUserName(userName)) },
    setPassword: (password) => { dispatch(setPassword(password)) },
    login: () => { dispatch(login()) },
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login)