import React, { Component } from 'react'
import "./style.css"
import { Link } from 'react-router-dom';

export default class BuyButton extends Component {
  render() {
    return (
      <Link to={`/purchase/${this.props.productId}`} className="buyButton">
        Buy Now
      </Link>
    );
  }
}