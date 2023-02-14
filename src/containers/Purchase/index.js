import React, { Component } from 'react'
import Header from '../../components/Header'
import PurchaseForm from './components/PurchaseForm'
import { connect } from 'react-redux'
import { quantitySelector, setQuantity, decrease, increase, productSelector, getLoginMobileSelector, submitOrder } from '../../redux/modules/purchase'

import MessageToast from '../../components/MessageToast'
import { successMessageSelector, clearSuccessMessage } from '../../redux/modules/app'

class Purchase extends Component {

  componentWillUnmount() {
    this.props.setQuantity(1)
  }

  render() {
    const { quantity, setQuantity, decrease, increase, product, mobile, submitOrder, successMessage, clearSuccessMessage } = this.props
    // console.log(this.props)
    return (
      <div>
        <Header title={'Place An Order'} history={this.props.history} />
        <PurchaseForm quantity={quantity} setQuantity={setQuantity} decrease={decrease} increase={increase} product={product} mobile={mobile} submitOrder={submitOrder} />
        {successMessage ? <MessageToast successMessage={successMessage} clearSuccessMessage={clearSuccessMessage} /> : null}
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  const productId = props.match.params.id
  return {
    quantity: quantitySelector(state),
    product: productSelector(state, productId),
    mobile: getLoginMobileSelector(state),
    successMessage: successMessageSelector(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setQuantity: (quantity) => { dispatch(setQuantity(quantity)) },
    decrease: (quantity) => { dispatch(decrease(quantity)) },
    increase: (quantity) => { dispatch(increase(quantity)) },
    submitOrder: (productId) => { dispatch(submitOrder(productId)) },
    clearSuccessMessage: () => { dispatch(clearSuccessMessage()) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Purchase)