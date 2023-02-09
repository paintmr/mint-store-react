import React, { Component } from 'react'
import './style.css'

const suggestList = [
  {
    id: 1,
    keyword: "hotpot ",
    quantity: 8710
  },
  {
    id: 2,
    keyword: "hotpot HK",
    quantity: 541
  },
  {
    id: 3,
    keyword: "hotpot Kwai Tsing",
    quantity: 65
  },
  {
    id: 4,
    keyword: "hotpot Kwun Tong",
    quantity: 133
  },
  {
    id: 5,
    keyword: "hotpot Sichuan",
    quantity: 179
  }
];

export default class SearchBox extends Component {
  state = {
    inputText: ''
  }

  render() {
    return (
      <div className="searchBox">
        <div className="searchBox__container">
          <input className="searchBox__text" placeholder='Enter a shop / place' value={this.state.inputText} onChange={this.handleChange} />
          <span className="searchBox__clear" onClick={this.handleClear}></span>
          <span className="searchBox__cancel" onClick={this.handleCancel}>Cancel</span>
        </div>
        {this.state.inputText ? this.renderSuggestList() : null}
      </div>
    );
  }

  handleChange = (e) => {
    this.setState({ inputText: e.target.value })
  }

  renderSuggestList = () => {
    return (
      <ul className="searchBox__list">
        {
          suggestList.map(item => {
            return (
              <li className="searchBox__item" key={item.id}>
                <span className="searchBox__itemKeyworkd">{item.keyword}</span>
                <span className="searchBox__itemQuantity">About {item.quantity} results</span>
              </li>
            )
          })
        }
      </ul>
    )
  }

  handleClear = () => {
    this.setState({ inputText: '' })
  }

}
