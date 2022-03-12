import React, { Component } from 'react';
import '../App.css';

class Sidebar extends Component {

  state = { isActive: false };


  handleToggle = () => {
    this.setState({ isActive: !this.state.isActive });
  };

  render() {
    const isActive = this.state.isActive;
    return (
      <div className={isActive ? "sidebar" : "active sidebar"}>
        <div className="sidebar-header">
          <button onClick={this.handleToggle} className="sidebar-button"><span className="material-icons">menu</span></button>
          <h1 className="sidebar-title">ACME</h1>
        </div>
        <ul className="sidebar-menu">
          {this.props.children}
        </ul>

      </div>
    )
  }
}

export default Sidebar;