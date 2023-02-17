import React, { Component } from 'react'
import Header from '../../components/Header'
import PurchaseForm from './components/PurchaseForm'
import { connect } from 'react-redux'
import { quantitySelector, setQuantity, decrease, increase, productSelector, getLoginMobileSelector, submitOrder } from '../../redux/modules/purchase'
import { productDetailsRequest } from '../../redux/modules/productdetails'

class Purchase extends Component {

  componentWillUnmount() {
    this.props.setQuantity(1)
  }

  componentDidMount() {
    const { product, productDetailsRequest } = this.props
    // In case the user refreshes the page
    // When the user has refreshed the page, data in redux store has been cleaned. Then a new request to fetch the productDetails should be dispatched.
    if (!product) {
      productDetailsRequest(this.props.match.params.id)
    }

  }

  render() {
    const { quantity, setQuantity, decrease, increase, product, mobile, submitOrder } = this.props
    // console.log(this.props)
    return (
      <div>
        <Header title={'Place An Order'} history={this.props.history} />
        <PurchaseForm quantity={quantity} setQuantity={setQuantity} decrease={decrease} increase={increase} product={product} mobile={mobile} submitOrder={submitOrder} />
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
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setQuantity: (quantity) => { dispatch(setQuantity(quantity)) },
    decrease: (quantity) => { dispatch(decrease(quantity)) },
    increase: (quantity) => { dispatch(increase(quantity)) },
    submitOrder: (productId) => { dispatch(submitOrder(productId)) },
    productDetailsRequest: (productId) => { dispatch(productDetailsRequest(productId)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Purchase)