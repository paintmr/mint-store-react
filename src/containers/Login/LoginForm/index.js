import React, { Component } from 'react';
import "./style.css"

export default class LoginForm extends Component {
  render() {
    const { userName, password, onChange, login } = this.props
    return (
      <div className="loginForm">
        <div className="loginForm__inputContainer">
          <div className="loginForm__row">
            <label className="loginForm__mobileLabel">852</label>
            <input className="loginForm__input"
              name="userName" type="number" placeholder='Mobile Number' value={userName} onChange={onChange}
            ></input>
          </div>
          <div className="loginForm__row">
            <label className="loginForm__passwordLabel">Password</label>
            <input className="loginForm__input"
              name="password"
              type="password" value={password} onChange={onChange}
            ></input>
          </div>
        </div>
        <div className="loginForm__btnContainer">
          <button className="loginForm__btn" onClick={login}>
            Login
          </button>
        </div>
      </div>
    );
  }
}
