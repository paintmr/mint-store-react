import React, { Component } from 'react'
import './style.css'

export default class ShopInfo extends Component {
  render() {
    const { shop: { shop, star, phone, address }, shopNum } = this.props

    return (
      <div className="shopInfo">
        <div className="shopInfo__header">
          Related restaurants ({shopNum})
          <span className="shopInfo__arrow"></span>
        </div>
        <div className="shopInfo__middle">
          <div className="shopInfo__middleLeft">
            <div className="shopInfo__shopName">
              {shop}
            </div>
            <div className="shopInfo__starsWrapper">
              <span className="shopInfo__stars">
                <i className="shopInfo__stars--red" style={{ "width": `${star * 20}%` }}></i>
              </span>
              <span className="shopInfo__distance">>100km</span>
            </div>
          </div>
          <a className="shopInfo__middleRight" href={`tel://${phone}`}>
            <i className="shopInfo__phoneIcon"></i>
          </a>
        </div>
        <div className="shopInfo__bottom">
          <i className="shopInfo__locationIcon"></i>{address}
        </div>
      </div>
    );
  }
}
