import React, { Component } from 'react'
import "./style.css"

const data = ['Ocean Park', 'Victoria Harbour', 'Victoria Peak', 'Star Ferry', 'Starbucks', 'hotpot', 'spa', 'noodles', 'dim sum']

export default class PopularSearch extends Component {
  render() {
    return (
      <div className="popularSearch">
        {
          data.map((item, index) => {
            return (
              <span key={index} className="popularSearch__item">{item}</span>
            )
          })
        }
      </div>
    );
  }
}
