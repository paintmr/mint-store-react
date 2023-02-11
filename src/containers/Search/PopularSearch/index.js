import React, { Component } from 'react'
import "./style.css"

export default class PopularSearch extends Component {
  render() {
    return (
      <div className="popularSearch">
        {
          this.props.popularKeywords.map((item, index) => {
            if (item) {
              return (
                <span key={item.id} className="popularSearch__item" onClick={this.addKeyword.bind(this, item)}>{item.keyword}</span>
              )
            } else {
              return null
            }
          })
        }
      </div>
    );
  }

  addKeyword = (item) => {
    this.props.addKeywordToHistory(item.keyword)
    // go to Search Results Page
    this.props.history.push('/searchresults')
  }
}
