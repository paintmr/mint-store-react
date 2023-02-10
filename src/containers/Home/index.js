import React, { Component } from 'react'
// Components
import HomeHeader from './components/HomeHeader'
import Banner from '../../components/Banner'
import Category from './components/Category'
import Headline from './components/Headline'
import Activity from './components/Activity'
import Discount from './components/Discount'
import RecommendedList from './components/RecommendList'
import Footer from '../../components/Footer'
import { connect } from 'react-redux'

// action creators and selectors
import { discountsSelector, recommendedSelector, rmdPageCountSelector, rmdIsFetchingSelector, discountsReqest, recommendedRequest } from '../../redux/modules/home'

class Home extends Component {
  componentDidMount() {
    this.props.fetchDiscountProducts()
  }
  render() {
    return (
      <div>
        <HomeHeader />
        <Banner />
        <Category />
        <Headline />
        <Activity />
        <Discount discountProducts={this.props.discountProducts} />
        <RecommendedList fetchRecommendedProducts={this.props.fetchRecommendedProducts} recommendedProducts={this.props.recommendedProducts} rmdPageCount={this.props.rmdPageCount} rmdIsFetching={this.props.rmdIsFetching} />
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    discountProducts: discountsSelector(state),
    recommendedProducts: recommendedSelector(state),
    rmdPageCount: rmdPageCountSelector(state),
    rmdIsFetching: rmdIsFetchingSelector(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchDiscountProducts: () => { dispatch(discountsReqest()) },
    fetchRecommendedProducts: () => { dispatch(recommendedRequest()) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)