import React, { Component } from 'react'
import Home from './containers/Home'
import "./App.css"
import { Switch, Route } from 'react-router-dom'
import ErrorToast from './components/ErrorToast'
import { connect } from 'react-redux'
import { errorSelector, clearError } from './redux/modules/app'

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route to="/" component={Home} />
        </Switch>
        {this.props.error ? <ErrorToast error={this.props.error} clearError={this.props.clearError} /> : null}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    error: errorSelector(state),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clearError: () => { dispatch(clearError()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)