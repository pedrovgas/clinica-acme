import React, { Component } from 'react';

class SelectForm extends Component {


    render() {
        return (
            <div className={this.props.flex ? "input-group flex-" + this.props.flex : "input-group"}>
                <label className="small muted" htmlFor={this.props.name}>{this.props.label}</label>
                <select value={this.props.value} onChange={this.props.onChange}>
                    {this.props.children}
                </select>
            </div>
        )
    }
}

export default SelectForm;