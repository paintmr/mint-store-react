import React, { Component } from 'react'
import "./style.css";

export default class ErrorToast extends Component {
  componentDidMount() {
    this.timer = setInterval(() => {
      this.props.clearError()
    }, 2000)
  }
  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  }
  render() {
    return (
      <div className="errorToast">
        <div className="errorToast__text">
          {this.props.error}
        </div>
      </div>
    );
  }
}
