import React, { Component } from 'react'
import "./style.css"
import RecommendedItem from '../RecommendedItem';
import Loading from '../../../../components/Loading';


export default class RecommendedList extends Component {

  state = {
    listenerRemoved: false
  }

  myRefRMDList = React.createRef();

  componentDidMount() {
    if (this.props.rmdPageCount === 0) {
      this.props.fetchRecommendedProducts()

    }
    document.addEventListener("scroll", this.handleScroll)
  }

  componentDidUpdate() {
    if (this.props.rmdPageCount >= 3 && !this.state.listenerRemoved) {
      document.removeEventListener("scroll", this.handleScroll)
      this.setState({ listenerRemoved: true })
    }
  }

  componentWillUnmount() {
    if (!this.state.listenerRemoved) {
      document.removeEventListener("scroll", this.handleScroll)
    }
  }

  render() {
    return (
      <div className="recommendedList" ref={this.myRefRMDList}>
        <div className="recommendedList__header">Recommended</div>
        <div className="recommendedList__list">
          {
            this.props.recommendedProducts.map((item, index) => {
              return <RecommendedItem key={index} data={item} />
            })
          }
        </div>
        {
          this.props.rmdPageCount < 3 ? (
            <Loading />
          ) : (
            <a className="recommendedList__viewAll">
              More products...
            </a>
          )
        }
      </div>
    );
  }

  handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const screenHeight = document.documentElement.clientHeight;
    const rmdListOffsetTop = this.myRefRMDList.current.offsetTop;
    const rmdListOffsetHeight = this.myRefRMDList.current.offsetHeight;

    setTimeout(() => {

      if ((scrollTop >= rmdListOffsetTop + rmdListOffsetHeight - screenHeight) && this.props.rmdPageCount < 3 && !this.props.rmdIsFetching) {
        this.props.fetchRecommendedProducts()
      }

    }, 500)




  }
}
