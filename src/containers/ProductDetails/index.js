import React, { Component } from 'react'
import "./style.css";
import Header from '../../components/Header';
import ProductOverView from './components/ProductOverview';
import ShopInfo from './components/ShopInfo';
import PurchaseDetails from './components/PurchaseDetails'
import Coupon from './components/Coupon';
import BuyButton from './components/BuyButton';

export default class ProductDetails extends Component {

  render() {
    return (
      <div>
        <Header title='Product Details' />
        <ProductOverView />
        <ShopInfo />
        <PurchaseDetails />
        <Coupon />
        <BuyButton />
      </div>
    );
  }
}
