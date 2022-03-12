import React, { Component } from 'react';

class InputForm extends Component {


    render() {
        return (
            <div className={this.props.flex ? "input-group flex-"+ this.props.flex : "input-group"}>
                <label className="small muted" htmlFor={this.props.name}>{this.props.label}</label>
                <input type={this.props.type ? this.props.type : "text"} value={this.props.value} onChange={this.props.onChange} required={this.props.required}></input>
            </div>
        )
    }
}

export default InputForm;