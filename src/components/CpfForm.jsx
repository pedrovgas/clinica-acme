import React, { Component } from 'react';

class CPF extends Component {

    render() {
        return (
            <div className={this.props.flex ? "input-group flex-" + this.props.flex : "input-group"}>
                <label className="small muted" htmlFor={this.props.name}>{this.props.label}</label>
                <input
                    maxLength="14"
                    minLength="14"
                    type="text"
                    value={this.props.value}
                    onChange={this.props.onChange}
                    required
                />
            </div>
        )
    }
}

export default CPF;