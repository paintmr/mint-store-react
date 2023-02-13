import React, { Component } from 'react'
import "./style.css";

export default class MessageToast extends Component {

  componentDidMount() {
    this.timer = setInterval(() => {
      const { clearError, clearSuccessMessage } = this.props
      if (clearError) {
        clearError()
      } else if (clearSuccessMessage) {
        clearSuccessMessage()
      }
    }, 2000)
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  }

  render() {
    const { error, successMessage } = this.props
    return (
      <div className="messageToast">
        <div className="messageToast__text">
          {
            error ?
              error :
              successMessage ?
                successMessage :
                null}
        </div>
      </div>
    );
  }
}
