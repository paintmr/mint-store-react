import React, { Component } from 'react';
import "./style.css"

class Detail extends Component {
  render() {
    return (
      <div className="purchasedetails">
        <div className="detail__header">
          <span>Purchase Details</span>
          <i className="detail__headerIcon"></i>
        </div>
        <table cellPadding="0" cellSpacing="0" className="detail__table">
          <tbody>
            <tr className="detail__row">
              <th colSpan="3" className="detail__category">
                Drinks
              </th>
            </tr>
            <tr className="detail__row">
              <td>Passion Fruit Juice (Cold Drinks)</td>
              <td className="detail__td--alignRight">
                1 Bottle
              </td>
              <td className="detail__td--alignRight">
                $48
              </td>
            </tr>
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
                $48
                <br />
                <strong className="detail__td--priceNew">
                  $19.9
                </strong>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="detail__remark">
          Free wifi
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

export default Detail;