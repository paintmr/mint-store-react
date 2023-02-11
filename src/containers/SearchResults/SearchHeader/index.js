import React, { Component } from 'react'
import './style.css'

export default class SearchHeader extends Component {
  render() {
    const { history } = this.props
    return (
      <header className="searchHeader">
        <div className="searchHeader__back" onClick={history.goBack}></div>
        <div className="searchHeader__list">
          <span className="searchHeader__item searchHeader__item--selected">Shops</span>
          <span className="searchHeader__item">Discounts</span>
        </div>
        <div className="searchHeader__icon" onClick={this.goToSearch}></div>
      </header >
    )
  }

  goToSearch = () => {
    this.props.history.push('/search')
  }
}
