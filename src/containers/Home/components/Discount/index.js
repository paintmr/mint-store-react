import React, { Component } from 'react'
import "./style.css"
import { Link } from 'react-router-dom';

export default class Discount extends Component {

  render() {
    return (
      <div className='discount'>
        <a className="discount__header">
          <span className="discount__title">Special discounts</span>
          <span className="discount__more">More discounts</span>
          <span className="discount__arrow" />
        </a>
        <div className="discount__content">
          {this.props.discountProducts.map((item, index) => {
            return (
              <Link to={`/productdetails/${item.id}`} key={item.id} className="discount__item">
                <div className="discount__itemPic">
                  <img width="100%" height="100%" src={item.picture} alt={item.shop} />
                </div>
                <div className="discount__itemTitle">{item.shop}</div>
                <div className="discount__itemPriceWrapper">
                  <ins className="discount__itemCurrentPrice">
                    {item.currentPrice}
                  </ins>
                  <del className="discount__itemOldPrice">{item.oldPrice}</del>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    )
  }
}
