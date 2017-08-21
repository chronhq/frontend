import React, { Component } from 'react';

export default class InputNumber extends Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value };
  }
  render() {
    return (
      <input
        className='inputNum'
        type='number'
        size='5'
        value={this.state.value}
        onChange={(e) => {
          this.setState({ value: Number(e.target.value) });
          this.props.cb({ [this.props.name]: Number(e.target.value) });
        }}
      />
    );
  }
}
