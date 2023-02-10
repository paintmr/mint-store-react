import React, { Component } from 'react'
import './style.css'

export default class SearchHeader extends Component {
  render() {
    return (
      <header className="searchHeader">
        <div className="searchHeader__back" ></div>
        <div className="searchHeader__list">
          <span className="searchHeader__item searchHeader__item--selected">Shops</span>
          <span className="searchHeader__item">Discounts</span>
        </div>
        <div className="searchHeader__icon" ></div>
      </header>
    )
  }
}
