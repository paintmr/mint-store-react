import React, { Component } from "react";
import "./style.css"

class OrderItem extends Component {
  render() {
    const {
      data: { id, title, statusText, orderPicUrl, channel, text, type, commentId }, deleteOrderRequest, commentOrderRequest, currentOrder
    } = this.props;
    return (
      <div className="orderItem">
        <div className="orderItem__title">
          <span>{title}</span>
        </div>
        <div className="orderItem__main">
          <div className="orderItem__imgWrapper">
            <div className="orderItem__tag">{statusText}</div>
            <img alt="" className="orderItem__img" src={orderPicUrl} />
          </div>
          <div className="orderItem__content">
            <div className="orderItem__line">{text[0]}</div>
            <div className="orderItem__line">{text[1]}</div>
          </div>
        </div>
        <div className="orderItem__bottom">
          <div className="orderItem__type">{channel}</div>
          <div>
            {type === 2 && !commentId ? <div className="orderItem__btn" onClick={commentOrderRequest}>Comment</div> : null}
            <div className="orderItem__btn" onClick={deleteOrderRequest}>Delete</div>
          </div>
        </div>
        {currentOrder && currentOrder.isCommenting && currentOrder.id === id ? this.renderCommentArea() : null}
      </div>
    );
  }

  renderCommentArea() {
    return (
      <div className="orderItem__commentContainer">
        <textarea
          className="orderItem__comment"
          onChange={this.setCommentText}
          value={this.props.currentOrder.comment}
        />
        {this.renderStars()}
        <button className="orderItem__commentBtn" onClick={this.props.submitOrderComment}>
          Submit
        </button>
        <button className="orderItem__commentBtn" onClick={this.props.cancelOrderComment}>
          Cancel
        </button>
      </div>
    );
  }

  renderStars() {
    const { starNum } = this.props.currentOrder
    return (
      <div>
        {[1, 2, 3, 4, 5].map((item, index) => {
          const lightClass = starNum >= item ? "orderItem__star--light" : "";
          return (
            <span
              className={"orderItem__star " + lightClass}
              key={index}
              onClick={this.setCommentStars.bind(this, item)}
            >
              ★
            </span>
          );
        })}
      </div>
    );
  }

  setCommentText = (e) => {
    this.props.setCommentText(e.target.value)
  }

  setCommentStars = (starNum) => {
    this.props.setCommentStars(starNum)
  }

}

export default OrderItem;