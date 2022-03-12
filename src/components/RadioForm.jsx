import React, { Component } from 'react';

class RadioForm extends Component {


    render() {
        return (
            <div className={this.props.flex ? "input-group flex-"+ this.props.flex : "input-group"}>
                <label className="small muted" htmlFor={this.props.name}>{this.props.label}</label>
                {this.props.children}
            </div>
        )
    }
}

export default RadioForm;