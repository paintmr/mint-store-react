import React, { Component } from 'react'
import "./style.css"

export default class SearchHistory extends Component {

  render() {
    const { historyKeywords } = this.props
    return (
      <div className="searchHistory">
        <div className="searchHistory__header">Search History</div>
        <ul className="searchHistory__list">
          {historyKeywords ?
            historyKeywords.map((item, index) => {
              return <li key={index} onClick={this.handleClick} className="searchHistory__item">
                {item}
              </li>
            }) : null
          }
        </ul>
        <div className="searchHistory__clear" onClick={this.props.clearSearchHistory}>Clear History</div>
      </div>
    );
  }

}
