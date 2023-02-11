import React, { Component } from 'react'
import LoginHeader from './LoginHeader'
import LoginForm from './LoginForm'
import { connect } from 'react-redux'
import { userNameSelector, passwordSelector, setUserName, setPassword, login } from '../../redux/modules/login'

class Login extends Component {
  render() {
    const { userName, password, login } = this.props
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
    password: passwordSelector(state)
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