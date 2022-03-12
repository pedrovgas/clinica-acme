import React, { Component } from 'react';
import { Link } from "react-router-dom";


class Header extends Component {


  render() {
    return (
      <div className="header">
        <div></div>
        <span>{this.props.title}</span>
        <Link to="/home">
          <button className="header-button"><span className="material-icons">exit_to_app</span></button>
        </Link>
      </div>
    )
  }
}

export default Header;