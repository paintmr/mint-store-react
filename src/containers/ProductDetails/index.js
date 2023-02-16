import React, { Component } from 'react'
import Header from '../../components/Header';
import ProductOverView from './components/ProductOverview';
import ShopInfo from './components/ShopInfo';
import PurchaseNotes from './components/PurchaseNotes'
import Coupon from './components/Coupon';
import BuyButton from './components/BuyButton';

import { connect } from 'react-redux'
// import actions and selectors
import { productDetailsRequest, shopDetailsRequest, getProductDetailsSelector, getShopSelector } from '../../redux/modules/productdetails'
class ProductDetails extends Component {

  componentDidMount() {
    const { productDetails, productDetailsRequest, shop, shopDetailsRequest } = this.props

    // 不能按照视频里教的这样写。假设目前详情页展示的是Product1，然后退出到首页，点击product2进入详情页，此时redux中仍然有Product1的详情，如果按照下面的代码写，页面不会去请求Product2的详情，而仍旧展示Product1的详情
    // if (!productDetails) {
    //   const { id } = this.props.match.params
    //   productDetailsRequest(id)
    // } else if (!shop) {
    //   shopDetailsRequest()
    // }


    const { id } = this.props.match.params
    productDetailsRequest(id)
    if (productDetails && !shop) {
      shopDetailsRequest()
    }
  }

  componentDidUpdate(preProps) {
    if (!preProps.productDetails && this.props.productDetails) {
      this.props.shopDetailsRequest()
    }
  }

  render() {
    const { productDetails, shop } = this.props
    let shopNum = null
    if (productDetails) {
      shopNum = productDetails.shopIds.length
    }
    return (
      <div>
        <Header title='Product Details' {...this.props} />
        {productDetails ? <ProductOverView productDetails={productDetails} /> : null}
        {shop ? <ShopInfo shop={shop} shopNum={shopNum} /> : null}
        {productDetails ? (
          <div>
            <PurchaseNotes productDetails={productDetails} />
            <Coupon productDetails={productDetails} />
            <BuyButton productId={productDetails.id} />
          </div>
        ) : null}
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    productDetails: getProductDetailsSelector(state),
    shop: getShopSelector(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    productDetailsRequest: (id) => { dispatch(productDetailsRequest(id)) },
    shopDetailsRequest: () => { dispatch(shopDetailsRequest()) }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails)