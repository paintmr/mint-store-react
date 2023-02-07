import React, { Component } from 'react'
import './style.css'

export default class Header extends Component {
  render() {
    const { title } = this.props
    return (
      <div className='header'>
        <div className="header__back">
          Back
        </div>
        <div className="header__title">{title}</div>
      </div>
    )
  }
}
