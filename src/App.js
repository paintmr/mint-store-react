import React, { Component } from 'react'
import "./App.css"
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import MessageToast from './components/MessageToast'
import { connect } from 'react-redux'
import { popUpMessageSelector, clearPopUpMessage } from './redux/modules/app'
import PrivateRoute from './containers/PrivateRoute'

// import Home from './containers/Home'
// import ProductDetails from './containers/ProductDetails'
// import Search from './containers/Search'
// import SearchResults from './containers/SearchResults'
// import Login from './containers/Login'
import UserCentre from './containers/UserCentre'
// import Purchase from './containers/Purchase'

// Dynamic imports and route-centric code splitting
import AsyncComponent from './utils/AsyncComponent'
const Home = AsyncComponent(() => import('./containers/Home'))
const ProductDetails = AsyncComponent(() => import('./containers/ProductDetails'))
const Search = AsyncComponent(() => import('./containers/Search'))
const SearchResults = AsyncComponent(() => import('./containers/SearchResults'))
const Login = AsyncComponent(() => import('./containers/Login'))
// const UserCentre = AsyncComponent(() => import('./containers/UserCentre'))
const Purchase = AsyncComponent(() => import('./containers/Purchase'))

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

        {this.props.popUpMessage ? <MessageToast popUpMessage={this.props.popUpMessage} clearPopUpMessage={this.props.clearPopUpMessage} /> : null}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    popUpMessage: popUpMessageSelector(state),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clearPopUpMessage: () => { dispatch(clearPopUpMessage()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)