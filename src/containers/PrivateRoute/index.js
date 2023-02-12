import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { loginStatusSelector } from '../../redux/modules/login'

class PrivateRoute extends Component {
  render() {
    const { loginStatus, component: Component, ...rest } = this.props
    return (
      <Route
        {...rest}
        render={props => {
          return loginStatus ? (<Component {...props} />) :
            (<Redirect to={{
              pathname: '/login',
              state: { from: props.location.pathname }
            }} />)
        }}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return { loginStatus: loginStatusSelector(state) }
}

export default connect(mapStateToProps, null)(PrivateRoute)