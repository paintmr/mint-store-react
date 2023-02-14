import React, { Component } from "react";
import "./style.css";
import { Link } from 'react-router-dom';

class PurchaseForm extends Component {
  render() {
    const { quantity, product, mobile } = this.props
    let sum = 0
    if (product && product.currentPrice) {
      sum = (quantity * product.currentPrice).toFixed(2)
    }
    return (

      <div className="purchaseForm">
        <div className="purchaseForm__wrapper">
          <div className="purchaseForm__row">
            <div className="purchaseForm__rowLabel">Quantity</div>
            <div className="purchaseForm__rowValue">
              <span
                className="purchaseForm__counter--dec"
                onClick={this.handleDecrease}
              >
                -
              </span>
              <input
                className="purchaseForm__quantity"
                onChange={this.handleChange}
                value={quantity}
                type='number'
              />
              <span
                className="purchaseForm__counter--inc"
                onClick={this.handleIncrease}
              >
                +
              </span>
            </div>
          </div>
          <div className="purchaseForm__row">
            <div className="purchaseForm__rowLabel">Sum</div>
            <div className="purchaseForm__rowValue">
              <span className="purchaseForm__totalPrice">${sum}</span>
            </div>
          </div>
          <div className="purchaseForm__row">
            <div className="purchaseForm__rowLabel">Mobile</div>
            <div className="purchaseForm__rowValue">{mobile}</div>
          </div>
        </div>
        <ul className="purchaseForm__remark">
          <li className="purchaseForm__remarkItem">
            <i className="purchaseForm__sign" />
            <span className="purchaseForm__desc">Refund Anytime</span>
          </li>
          <li>
            <i className="purchaseForm__sign" />
            <span className="purchaseForm__desc">Refund After Expiry Date</span>
          </li>
          <Link to="/usercentre" className="purchaseForm__to__usercentre">
            <span className="purchaseForm__to__usercentre__text">My Orders</span>
          </Link>
        </ul>
        <a className="purchaseForm__submit" onClick={this.handleClick}>
          Submit Order
        </a>
      </div>


    );
  }

  handleDecrease = () => {
    if (this.props.quantity > 1) {
      this.props.decrease()
    }
  };

  handleIncrease = () => {
    this.props.increase()
  };

  handleChange = (e) => {
    const quantity = parseInt(e.target.value)
    this.props.setQuantity(quantity)
  };

  handleClick = () => {
    this.props.submitOrder(this.props.product.id)
  };
}

export default PurchaseForm;