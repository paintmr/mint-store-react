import React, { Component } from 'react'
import './style.css'
import { Link } from 'react-router-dom';
export default class HomeHeader extends Component {
  render() {
    return (
      <div className="homeHeader">
        <header className="homeHeader__wrapper">
          <a className="homeHeader__city">HK</a>
          <Link to="/search" className="homeHeader__search">Enter a shop or place</Link>
          <Link to="/usercentre" className="homeHeader__self">
            <div className="homeHeader__portrait" />
          </Link>
        </header>
      </div>
    );
  }
}
