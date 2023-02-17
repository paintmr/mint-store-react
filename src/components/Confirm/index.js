import React, { Component } from "react";
import "./style.css";

class Confirm extends Component {
  render() {
    const {
      content,
      cancelText,
      confirmText,
      onCancel,
      onConfirm
    } = this.props;
    return (
      <div className="confirm">
        <div className="confirm__alert">
          <div className="confirm__content">{content}</div>
          <div className="confirm__btns">
            <span className="confirm__btn" onClick={onCancel} >
              {cancelText}
            </span>
            <span className="confirm__btn" onClick={onConfirm} >
              {confirmText}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Confirm;