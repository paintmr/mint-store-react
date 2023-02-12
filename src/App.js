import React, { Component } from 'react'
import Home from './containers/Home'
import "./App.css"
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import ErrorToast from './components/ErrorToast'
import { connect } from 'react-redux'
import { errorSelector, clearError } from './redux/modules/app'
import ProductDetails from './containers/ProductDetails'
import Search from './containers/Search'
import SearchResults from './containers/SearchResults'
import Login from './containers/Login'
import PrivateRoute from './containers/PrivateRoute'
import UserCentre from './containers/UserCentre'

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/productdetails/:id" component={ProductDetails} />
            <Route path="/search" component={Search} />
            <Route path="/searchresults" component={SearchResults} />
            <Route path="/login" component={Login} />
            {/* PrivateRoute is a special route to make sure that only certain users can visit. For example, only users having logined can visit the usercentre page */}
            <PrivateRoute path="/usercentre" component={UserCentre} />
            <Route path="/" component={Home} />
          </Switch>
        </BrowserRouter>

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