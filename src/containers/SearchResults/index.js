import React, { Component } from 'react'
import SearchHeader from './SearchHeader'
import SearchBox from './SearchBox'
import Banner from '../../components/Banner'
import ShopList from './ShopList'

export default class SearchResults extends Component {
  render() {
    return (
      <div>
        <SearchHeader history={this.props.history} />
        <SearchBox keyword={this.props.location.state.keyword} />
        <Banner />
        <ShopList />
      </div>
    )
  }
}
