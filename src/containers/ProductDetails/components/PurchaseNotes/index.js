import React, { Component } from 'react';
import "./style.css"

export default class PurchaseNotes extends Component {
  render() {
    const { detail: { category, products, remark }, currentPrice, oldPrice } = this.props.productDetails
    return (
      <div className="purchase__notes">
        <div className="detail__header">
          <span>Purchase Notes</span>
          <i className="detail__headerIcon"></i>
        </div>
        <table cellPadding="0" cellSpacing="0" className="detail__table">
          <tbody>
            <tr className="detail__row">
              <th colSpan="3" className="detail__category">
                {category}
              </th>
            </tr>

            {products.map((rowInfo, index) => {
              return (
                <tr key={index} className="detail__row">
                  <td>{rowInfo.name}</td>
                  <td className="detail__td--alignRight">
                    {rowInfo.quantity}
                  </td>
                  <td className="detail__td--alignRight">
                    {rowInfo.price}
                  </td>
                </tr>
              )
            })}

            <tr className="detail__row">
              <td />
              <td className="detail__td--price">
                Original Price
                <br />
                <strong className="detail__td--priceNew">
                  Coupon Price
                </strong>
              </td>
              <td className="detail__td--price">
                ${oldPrice}
                <br />
                <strong className="detail__td--priceNew">
                  ${currentPrice}
                </strong>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="detail__remark">
          {remark}
        </div>
        <div className="detail__more">
          <span>More details</span>
          <span className="detail__notice">(in pictures and words)</span>
          <i className="detail__arrow" />
        </div>
      </div>
    );
  }
}
