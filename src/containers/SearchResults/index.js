import React, { Component } from 'react'
import SearchHeader from './SearchHeader'
import SearchBox from './SearchBox'
import Banner from '../../components/Banner'
import ShopList from './ShopList'

import { connect } from 'react-redux'
// import selectors, actions
import { shopsByKeywordRequest, keywordSelector, shopsByKeywordSelector } from '../../redux/modules/search'

class SearchResults extends Component {
  componentDidMount() {
    this.props.shopsByKeywordRequest(this.props.keyword)
  }

  render() {
    return (
      <div>
        <SearchHeader history={this.props.history} />
        <SearchBox keyword={this.props.keyword} />
        <Banner />
        <ShopList shopsByKeyword={this.props.shopsByKeyword} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    keyword: keywordSelector(state),
    shopsByKeyword: shopsByKeywordSelector(state),

  }
}

const mapDispatchToProps = dispatch => {
  return {
    shopsByKeywordRequest: (keyword) => { dispatch(shopsByKeywordRequest(keyword)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults)