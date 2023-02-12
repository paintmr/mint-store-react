import React, { Component } from 'react'
import "./style.css"

export default class UserHeader extends Component {
  render() {
    const { goToHome, logout } = this.props;
    return (
      <header className="userHeader">
        <div className="userHeader__back" onClick={goToHome}>
          Home
        </div>
        <div className="userHeader__list">
          <span className="userHeader__item userHeader__item--selected">
            Orders
          </span>
          <span className="userHeader__item">Coupons</span>
        </div>
        <div className="userHeader__right" onClick={logout}>
          Logout
        </div>
      </header>
    );
  }
}
