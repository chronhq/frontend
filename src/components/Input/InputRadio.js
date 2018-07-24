import React from 'react';

export default class InputRadio extends React.Component {
  render() {
    return (
      <label htmlFor={this.props.name}>
        <span>
          <input
            id={this.props.name}
            type="radio"
            checked={this.props.checked}
            onChange={() => this.toggleCheck()}
            {...this.props}
          />
          <span />
        </span>
        {this.props.label}
      </label>
    );
  }
}
