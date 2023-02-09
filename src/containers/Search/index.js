import React, { Component } from 'react'
import SearchBox from './SearchBox'
import PopularSearch from './PopularSearch'
import SearchHistory from './SearchHistory'

export default class Search extends Component {
  render() {
    return (
      <div>
        <SearchBox />
        <PopularSearch />
        <SearchHistory />
      </div>
    )
  }
}
