import React, { Component } from "react";
import OrderItem from "../OrderItem"
import "./style.css"

const tabTitles = ["All", "To be paid", "Available", "Refund"];

export default class UserMain extends Component {

  render() {
    const { tabIndex, orders } = this.props;

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
      </div>
    );
  }

  renderOrderList = data => {
    return data.map(item => {
      return (
        <OrderItem key={item.id} data={item} />
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
}
