import React, { Component } from 'react'
import './style.css'

export default class SearchBox extends Component {

  render() {
    const { inputText } = this.props
    return (
      <div className="searchBox">
        <div className="searchBox__container">
          <input className="searchBox__text" placeholder='Enter a shop / place' value={inputText} onChange={this.handleChange} />
          <span className="searchBox__clear" onClick={this.props.clearInputText}></span>
          <span className="searchBox__cancel" onClick={this.handleCancel}>Cancel</span>
        </div>
        {inputText ? this.renderSuggestList() : null}
      </div>
    );
  }

  handleChange = (e) => {
    const inputText = e.target.value.trim()
    if (inputText) {
      this.props.setInputText(e.target.value)
      this.props.relatedKeywordsRequest(e.target.value)
    } else {
      // this.props.clearInputText() here is a must. Otherwise, when the user has deleted the last character in the input, inputText in line 24 receives an empty string. Then lines 26 and 27 won't be executed. Then setInputText() won't be able to set state.search.inputText to an empty string. Then the last character will always be in the input area, making the user feel that she is unable to delete that character forever.
      this.props.clearInputText()
    }
  }

  renderSuggestList = () => {
    const { relatedKeywords } = this.props
    return (
      <ul className="searchBox__list">
        {
          relatedKeywords ?
            relatedKeywords.map(item => {
              return (
                <li className="searchBox__item" key={item.id} onClick={this.addKeyword.bind(this, item)}>
                  <span className="searchBox__itemKeyworkd">{item.keyword}</span>
                  <span className="searchBox__itemQuantity">About {item.quantity} results</span>
                </li>
              )
            }) : null
        }
      </ul>
    )
  }

  addKeyword = (item) => {
    this.props.addKeywordToHistory(item.keyword)
    this.props.clearInputText()
    // go to Search Results Page
    this.props.history.push('/searchresults')
  }

  handleCancel = () => {
    this.props.clearInputText()
    this.props.history.push('/')
  }
}
