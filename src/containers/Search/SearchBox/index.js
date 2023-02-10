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
    const { inputText } = this.props
    return (
      <div className="searchBox">
        <div className="searchBox__container">
          <input className="searchBox__text" placeholder='Enter a shop / place' value={inputText} onChange={this.handleChange} />
          <span className="searchBox__clear" onClick={this.props.clearInputText}></span>
          <span className="searchBox__cancel" onClick={this.props.goBack}>Cancel</span>
        </div>
        {inputText ? this.renderSuggestList() : null}
      </div>
    );
  }

  handleChange = (e) => {
    this.props.setInputText(e.target.value)
  }

  renderSuggestList = () => {
    return (
      <ul className="searchBox__list">
        {
          suggestList.map(item => {
            return (
              <li className="searchBox__item" key={item.id} onClick={this.addKeyword.bind(this, item)}>
                <span className="searchBox__itemKeyworkd">{item.keyword}</span>
                <span className="searchBox__itemQuantity">About {item.quantity} results</span>
              </li>
            )
          })
        }
      </ul>
    )
  }

  addKeyword = (item) => {
    this.props.addKeywordToHistory(item.keyword)
    this.props.clearInputText()
    // go to Search Results Page
    this.props.history.push('/searchresults', { keyword: item.keyword })
  }

}
