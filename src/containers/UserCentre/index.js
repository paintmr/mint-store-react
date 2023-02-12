import React, { Component } from 'react'
import UserHeader from './components/UserHeader'
import UserMain from './containers/UserMain'
import { connect } from 'react-redux'
import { logout } from '../../redux/modules/login'
import { ordersReqest, changeTab, tabIndexSelector, ordersSelector } from '../../redux/modules/usercentre'


class UserCentre extends Component {
  componentDidMount() {
    this.props.fetchOrders()
  }

  render() {
    const { logout, changeTab, tabIndex, orders } = this.props
    return (
      <div>
        <UserHeader goToHome={this.goToHome} logout={logout} />
        <UserMain changeTab={changeTab} tabIndex={tabIndex} orders={orders} />
      </div>
    )
  }

  goToHome = () => {
    this.props.history.push('/')
  }
}


const mapStateToProps = (state) => {
  return {
    tabIndex: tabIndexSelector(state),
    orders: ordersSelector(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrders: () => { dispatch(ordersReqest()) },
    logout: () => { dispatch(logout()) },
    changeTab: (index) => { dispatch(changeTab(index)) }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserCentre)