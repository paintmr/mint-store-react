import React, { Component } from 'react'
import "./style.css";

export default class MessageToast extends Component {

  componentDidMount() {
    this.timer = setInterval(() => {
      const { clearPopUpMessage } = this.props
      clearPopUpMessage()
    }, 2000)
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  }

  render() {
    const { popUpMessage } = this.props
    return (
      <div className="messageToast">
        <div className="messageToast__text">
          {popUpMessage}
        </div>
      </div>
    );
  }
}
