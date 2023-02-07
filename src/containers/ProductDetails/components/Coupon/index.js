import React, { Component } from 'react'
import "./style.css";

export default class Coupon extends Component {
  render() {
    return (
      <div className="coupon">
        <div className="coupon__header">
          Coupon Info
          <i className="coupon__icon" />
        </div>
        <div className="coupon__list">
          <dl className="coupon__item">
            <dt className="coupon__itemTitle">Validity Period</dt>
            <dd className="coupon__itemDesc">January 1 to September 29</dd>
          </dl>
          <dl className="coupon__item">
            <dt className="coupon__itemTitle">Exceptions</dt>
            <dd className="coupon__itemDesc">The last Sunday of each month</dd>
          </dl>
          <dl className="coupon__item">
            <dt className="coupon__itemTitle">Time</dt>
            <dd className="coupon__itemDesc">Coupon Time: 11:00-22:00</dd>
          </dl>
          <dl className="coupon__item">
            <dt className="coupon__itemTitle">Booking</dt>
            <dd className="coupon__itemDesc">
              No need booking
            </dd>
          </dl>
          <dl className="coupon__item">
            <dt className="coupon__itemTitle">Suggestion</dt>
            <dd className="coupon__itemDesc">2 people / coupon</dd>
          </dl>
        </div>
      </div>
    );
  }
}