import React, { Component } from 'react'
import "./style.css"


export default class Loading extends Component {
  render() {
    return (
      <div className="loading">
        <div className="loading__img" />
        <span>Loading...</span>
      </div>
    )
  }
}
