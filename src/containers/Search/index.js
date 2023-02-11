import React, { Component } from 'react'
import SearchBox from './SearchBox'
import PopularSearch from './PopularSearch'
import SearchHistory from './SearchHistory'

import { connect } from 'react-redux'
// import selectors, actions 
import { inputTextSelector, popularKeywordsSelector, historyKeywordsSelector, relatedKeywordsSelector, setInputText, clearInputText, popularKeywordsRequest, clearSearchHistory, addKeywordToHistory, relatedKeywordsRequest } from '../../redux/modules/search'

class Search extends Component {
  componentDidMount() {
    this.props.popularKeywordsRequest()
  }

  render() {
    const { inputText, setInputText, clearInputText, relatedKeywords, popularKeywords, historyKeywords, clearSearchHistory, addKeywordToHistory, history, relatedKeywordsRequest } = this.props
    return (
      <div>
        <SearchBox inputText={inputText} setInputText={setInputText} clearInputText={clearInputText} goBack={this.goBack} relatedKeywords={relatedKeywords} addKeywordToHistory={addKeywordToHistory} history={history} relatedKeywordsRequest={relatedKeywordsRequest} />
        <PopularSearch popularKeywords={popularKeywords} addKeywordToHistory={addKeywordToHistory} history={history} />
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
    historyKeywords: historyKeywordsSelector(state),
    relatedKeywords: relatedKeywordsSelector(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setInputText: (inputText) => { dispatch(setInputText(inputText)) },
    clearInputText: (inputText) => { dispatch(clearInputText(inputText)) },
    popularKeywordsRequest: () => { dispatch(popularKeywordsRequest()) },
    clearSearchHistory: () => { dispatch(clearSearchHistory()) },
    addKeywordToHistory: (keyword) => { dispatch(addKeywordToHistory(keyword)) },
    relatedKeywordsRequest: (keyword) => { dispatch(relatedKeywordsRequest(keyword)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)