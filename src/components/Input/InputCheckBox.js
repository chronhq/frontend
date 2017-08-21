import React, { Component } from 'react';

export default class InputCheckBox extends Component {
  constructor(props) {
    super(props);
    this.state = { checked: props.checked };
  }
  render() {
    return (
      <label htmlFor={this.props.name}>
        <input
          type='checkbox'
          checked={this.state.checked}
          onChange={(e) => {
            this.setState({ checked: Number(e.target.checked) });
            this.props.cb({ [this.props.name]: Number(e.target.checked) });
          }}
        />
        {this.props.label}
      </label>
    );
  }
}
