import React, { Component } from 'react';

export default class InputRange extends Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value };
  }
  render() {
    return (
      <label htmlFor={this.props.name}>
        <input
          type='range'
          min={this.props.min}
          max={this.props.max}
          value={this.state.value}
          step='1'
          onChange={(e) => {
            this.setState({ value: Number(e.target.value) });
            this.props.cb({ [this.props.name]: Number(e.target.value) });
            }}
        />
        {this.props.label}
      </label>
    );
  }
}
