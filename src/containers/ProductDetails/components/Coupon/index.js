import React, { Component } from 'react'
import "./style.css";

export default class Coupon extends Component {
  render() {
    const { validityPeriod, purchaseNotes } = this.props.productDetails
    return (
      <div className="coupon">
        <div className="coupon__header">
          Coupon Info
          <i className="coupon__icon" />
        </div>
        <div className="coupon__list">
          <dl className="coupon__item">
            <dt className="coupon__itemTitle">Validity Period</dt>
            <dd className="coupon__itemDesc">{validityPeriod}</dd>
          </dl>
          {purchaseNotes.map((item, index) => {
            return (
              <dl key={index} className="coupon__item">
                <dt className="coupon__itemTitle">{item.title}</dt>
                <dd className="coupon__itemDesc">{item.content}</dd>
              </dl>
            )
          })}

        </div>
      </div>
    );
  }
}