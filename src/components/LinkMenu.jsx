import React, { Component } from 'react';

class Link extends Component {


    render() {
        return (
            <div className="sidebar-item">
                <li>
                    <span className="material-icons">{this.props.icon} </span>
                    <span className="item-text">{this.props.title}</span>
                </li>
            </div>
        )
    }
}

export default Link;