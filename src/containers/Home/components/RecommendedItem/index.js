import React, { Component } from 'react'
import "./style.css"
import { Link } from 'react-router-dom';

export default class RecommendedItem extends Component {
  render() {
    const {
      id,
      shop,
      tag,
      picture,
      product,
      currentPrice,
      oldPrice,
      saleDesc
    } = this.props.data;
    return (
      <Link to={`/productdetails/${id}`} className="RecommendedItem">
        <div className="recommendedItem__picContainer">
          <div className="recommendedItem__picTag">{tag}</div>
          <img className="recommendedItem__pic" src={picture} alt={shop} />
        </div>
        <div className="recommendedItem__content">
          <div className="recommendedItem__shop">{shop}</div>
          <div className="recommendedItem__product">{product}</div>
          <div className="recommendedItem__detail">
            <div className="recommendedItem__price">
              <ins className="recommendedItem__currentPrice">{currentPrice}</ins>
              <del className="recommendedItem__oldPrice">{oldPrice}</del>
            </div>
            <div className="recommendedItem__sale">{saleDesc}</div>
          </div>
        </div>
      </Link>
    );
  }
}
