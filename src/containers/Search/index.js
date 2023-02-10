import React, { Component } from 'react'
import SearchBox from './SearchBox'
import PopularSearch from './PopularSearch'
import SearchHistory from './SearchHistory'

import { connect } from 'react-redux'
// import selectors, actions 
import { inputTextSelector, popularKeywordsSelector, historyKeywordsSelector, setInputText, clearInputText, popularKeywordsRequest, clearSearchHistory, addKeywordToHistory } from '../../redux/modules/search'

class Search extends Component {
  componentDidMount() {
    this.props.popularKeywordsRequest()
  }

  render() {
    const { inputText, setInputText, clearInputText, popularKeywords, historyKeywords, clearSearchHistory, addKeywordToHistory } = this.props
    return (
      <div>
        <SearchBox inputText={inputText} setInputText={setInputText} clearInputText={clearInputText} goBack={this.goBack} addKeywordToHistory={addKeywordToHistory} />
        <PopularSearch popularKeywords={popularKeywords} addKeywordToHistory={addKeywordToHistory} />
        <SearchHistory historyKeywords={historyKeywords} clearSearchHistory={clearSearchHistory} />
      </div>
    )
  }

  goBack = () => {
    this.props.history.goBack()
  }
}

const mapStateToProps = state => {
  return {
    inputText: inputTextSelector(state),
    popularKeywords: popularKeywordsSelector(state),
    historyKeywords: historyKeywordsSelector(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setInputText: (inputText) => { dispatch(setInputText(inputText)) },
    clearInputText: (inputText) => { dispatch(clearInputText(inputText)) },
    popularKeywordsRequest: () => { dispatch(popularKeywordsRequest()) },
    clearSearchHistory: () => { dispatch(clearSearchHistory()) },
    addKeywordToHistory: (keyword) => { dispatch(addKeywordToHistory(keyword)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)