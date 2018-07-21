import React, { Component } from 'react';

export default class InputCheckBox extends Component {
  constructor(props) {
    super(props);
    this.state = { checked: props.checked };
  }

  render() {
    return (
      <label htmlFor={this.props.name}>
        <span>
          <input
            id={this.props.name}
            type='checkbox'
            checked={this.state.checked}
            onChange={(e) => {
              this.setState({ checked: Number(e.target.checked) });
              this.props.cb({ [this.props.name]: Number(e.target.checked) });
            }}
          />
          <span />
        </span>
        {this.props.label}
      </label>
    );
  }
}
