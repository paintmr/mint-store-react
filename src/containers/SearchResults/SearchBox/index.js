import React, { Component } from "react";
import { Link } from "react-router-dom";
import './style.css'

export default class SearchBox extends Component {
  render() {
    const { keyword } = this.props;
    return (
      <div className="keywordBox">
        <Link to="/search" className="keywordBox__text">
          {keyword}
        </Link>
      </div>
    );
  }
}
