import React, { Component } from 'react'
import "./style.css"
import ShopItem from '../ShopItem';

export default class ShopList extends Component {
  render() {
    const { shopsByKeyword } = this.props
    return (
      <div className="shopList">
        <div className="shopList__filter">
          <span className="shopList__filterItem">All Shops</span>
          <span className="shopList__filterItem">All Categories</span>
          <span className="shopList__filterItem">Auto sorting</span>
        </div>
        <div className="shopList__list">
          {shopsByKeyword ? shopsByKeyword.map((item, index) => {
            return (
              <div key={item.id}>
                <ShopItem data={item} />
                {index < shopsByKeyword.length - 1 ? (
                  <div className="shopList__divider" />
                ) : null}
              </div>
            );
          }) : null}
        </div>
      </div>
    );
  }
}
