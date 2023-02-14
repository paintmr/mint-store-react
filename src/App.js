import React, { Component } from 'react'
import Home from './containers/Home'
import "./App.css"
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import MessageToast from './components/MessageToast'
import { connect } from 'react-redux'
import { errorSelector, clearError } from './redux/modules/app'
import ProductDetails from './containers/ProductDetails'
import Search from './containers/Search'
import SearchResults from './containers/SearchResults'
import Login from './containers/Login'
import PrivateRoute from './containers/PrivateRoute'
import UserCentre from './containers/UserCentre'
import Purchase from './containers/Purchase'

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
            {/* PrivateRoute is a special route to make sure that only certain users can visit certain pages. For example, only users having logined in can visit the UserCentre page */}
            <PrivateRoute path="/userCentre" component={UserCentre} />
            <PrivateRoute path="/purchase/:id" component={Purchase} />
            <Route path="/" component={Home} />
          </Switch>
        </BrowserRouter>

        {this.props.error ? <MessageToast error={this.props.error} clearError={this.props.clearError} /> : null}
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