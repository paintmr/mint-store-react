import React, { Component } from "react";
import OrderItem from "../../components/OrderItem"
import "./style.css"
// To handle deletion and comments conveniently, change UserMain from a UI Component to a Container 
import { connect } from 'react-redux'
import {
  deleteOrderRequest, cancelDeleteOrder, confirmDeleteOrder, currentOrderSelector, commentOrderRequest, cancelOrderComment, setCommentText, setCommentStars, submitOrderComment, changeCommentingOrderRequest, cancelChangeCommentingOrder, confirmChangeCommentingOrder
} from "../../../../redux/modules/usercentre";

import Confirm from "../../../../components/Confirm";

const tabTitles = ["All", "Available", "Completed", "Refund"];

class UserMain extends Component {

  render() {
    const { tabIndex, orders, cancelDeleteOrder, confirmDeleteOrder, currentOrder, cancelChangeCommentingOrder } = this.props;

    return (
      <div className="userMain">
        <div className="userMain__menu">
          {tabTitles.map((item, index) => {
            return (
              <div key={index} className="userMain__tab" onClick={this.handleClickTab.bind(this, index)}>
                <span
                  className={
                    tabIndex === index
                      ? "userMain__title userMain__title--active"
                      : "userMain__title"
                  }
                >
                  {item}
                </span>
              </div>
            );
          })}
        </div>
        <div className="userMain__content">
          {orders && orders.length > 0
            ? this.renderOrderList(orders)
            : this.renderEmpty()}
        </div>
        {currentOrder.isDeleting ? <Confirm content='Delete the order?' cancelText='Cancel' confirmText='Confirm' onCancel={cancelDeleteOrder} onConfirm={confirmDeleteOrder} /> : null}
        {currentOrder.changeCommentingOrder ? <Confirm content='Your comment has not been saved. Change commenting order?' cancelText='Cancel' confirmText='Confirm' onCancel={cancelChangeCommentingOrder} onConfirm={this.confirmChangeCommentingOrder} /> : null}
      </div>
    );
  }

  renderOrderList = data => {
    const { currentOrder, cancelOrderComment, setCommentText, setCommentStars, submitOrderComment } = this.props
    return data.map(item => {
      return (
        <OrderItem key={item.id} data={item} deleteOrderRequest={this.deleteOrderRequest.bind(this, item.id)} currentOrder={currentOrder} commentOrderRequest={this.commentOrderRequest.bind(this, item.id)} cancelOrderComment={cancelOrderComment} setCommentText={setCommentText} setCommentStars={setCommentStars} submitOrderComment={submitOrderComment} />
      )
    })
  }

  renderEmpty = () => {
    return (
      <div className="userMain__empty">
        <div className="userMain__emptyIcon" />
        <div className="userMain__emptyText1">No orders right now</div>
        <div className="userMain__emptyText2">You may want to shop around</div>
      </div>
    )
  }

  handleClickTab = (index) => {
    this.props.changeTab(index)
  }

  deleteOrderRequest = (id) => {
    this.props.deleteOrderRequest(id)
  }

  commentOrderRequest = (id) => {
    const { currentOrder: { isCommenting, comment, starNum } } = this.props
    if (isCommenting && (comment || starNum > 0)) {
      this.props.changeCommentingOrderRequest(id)
    } else {
      this.props.commentOrderRequest(id)
    }
  }

  confirmChangeCommentingOrder = () => {
    this.props.confirmChangeCommentingOrder(this.props.currentOrder.nextId)
  }
}

const mapStateToProps = (state) => {
  return {
    currentOrder: currentOrderSelector(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteOrderRequest: (id) => { dispatch(deleteOrderRequest(id)) },
    cancelDeleteOrder: () => { dispatch(cancelDeleteOrder()) },
    confirmDeleteOrder: () => { dispatch(confirmDeleteOrder()) },
    commentOrderRequest: (id) => { dispatch(commentOrderRequest(id)) },
    cancelOrderComment: () => { dispatch(cancelOrderComment()) },
    setCommentText: (text) => { dispatch(setCommentText(text)) },
    setCommentStars: (starNum) => { dispatch(setCommentStars(starNum)) },
    submitOrderComment: () => { dispatch(submitOrderComment()) },
    changeCommentingOrderRequest: (nextId) => { dispatch(changeCommentingOrderRequest(nextId)) },
    cancelChangeCommentingOrder: () => { dispatch(cancelChangeCommentingOrder()) },
    confirmChangeCommentingOrder: (nextId) => { dispatch(confirmChangeCommentingOrder(nextId)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserMain)
