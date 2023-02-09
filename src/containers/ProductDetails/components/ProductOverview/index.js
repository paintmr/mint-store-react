import React, { Component } from 'react'
import './style.css'
import { Link } from 'react-router-dom';

export default class ProductOverView extends Component {
  render() {
    const { id, picture, shop, description, currentPrice, oldPrice } = this.props.productDetails
    return (
      <div className="productOverview">
        <div className="productOverview__header">
          <div className="productOverview__imgContainer">
            <img
              alt=""
              className="productOverview__img"
              src={picture}
            />
          </div>
          <div className="productOverview__baseInfo">
            <div className="productOverview__title">{shop}</div>
            <div className="productOverview__content">
              {description}
            </div>
          </div>
        </div>
        <div className="productOverview__purchase">
          <span className="productOverview__symbol">$</span>
          <span className="productOverview__price">{currentPrice}</span>
          <span className="productOverview__price--old">${oldPrice}</span>
          <Link to={`/purchase/${id}`} className="productOverview__btn">Buy Now</Link>
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
