import React, { Component } from "react";
import OrderItem from "../../components/OrderItem"
import "./style.css"
// To handle deletion and comments conveniently, change UserMain from a UI Component to a Container 
import { connect } from 'react-redux'
import { deleteOrderRequest, deletingOrderStatusSelector, cancelDeleteOrder, confirmDeleteOrder } from "../../../../redux/modules/usercentre";

import Confirm from "../../../../components/Confirm";


const tabTitles = ["All", "To be paid", "Completed", "Refund"];

class UserMain extends Component {

  render() {
    const { tabIndex, orders, deletingOrderStatus, cancelDeleteOrder, confirmDeleteOrder } = this.props;

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
        {deletingOrderStatus ? <Confirm content='Delete the order?' cancelText='Cancel' confirmText='Confirm' onCancel={cancelDeleteOrder} onConfirm={confirmDeleteOrder} /> : null}
      </div>
    );
  }

  renderOrderList = data => {
    return data.map(item => {
      return (
        <OrderItem key={item.id} data={item} deleteOrderRequest={this.deleteOrderRequest.bind(this, item.id)} />
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
}

const mapStateToProps = (state) => {
  return {
    deletingOrderStatus: deletingOrderStatusSelector(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteOrderRequest: (id) => { dispatch(deleteOrderRequest(id)) },
    cancelDeleteOrder: () => { dispatch(cancelDeleteOrder()) },
    confirmDeleteOrder: () => { dispatch(confirmDeleteOrder()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserMain)
