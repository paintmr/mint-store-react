import React, { Component } from 'react'
import './style.css'

export default class ProductOverView extends Component {
  render() {
    return (
      <div className="productOverview">
        <div className="productOverview__header">
          <div className="productOverview__imgContainer">
            <img
              alt=""
              className="productOverview__img"
              src="https://p0.meituan.net/deal/e6864ed9ce87966af11d922d5ef7350532676.jpg@450w_280h_1e_1c_1l|watermark=1&&r=1&p=9&x=2&y=2&relative=1&o=20"
            />
          </div>
          <div className="productOverview__baseInfo">
            <div className="productOverview__title">YD Creative Cuisine</div>
            <div className="productOverview__content">
              Just $19.9 for Delicious Passion Fruit Juice!
            </div>
          </div>
        </div>
        <div className="productOverview__purchase">
          <span className="productOverview__symbol">$</span>
          <span className="productOverview__price">19.9</span>
          <span className="productOverview__price--old">$48</span>
          <a className="productOverview__btn">Buy Now</a>
        </div>
        <ul className="productOverview__remark">
          <li className="productOverview__remarkItem">
            <i className="productOverview__sign1" />
            <span className="productOverview__desc">Refund Anytime</span>
          </li>
          <li className="productOverview__remarkItem">
            <i className="productOverview__sign2" />
            <span className="productOverview__desc">Auto Refund</span>
          </li>
        </ul>
      </div>
    );
  }
}
