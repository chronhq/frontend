import React from 'react';

const RadioText = ({ ids, value, data, cb }) => (
  <div>
    <Radio ids={ids} value={value} data={data} cb={cb} />
    {data.checked === true ?
      <input type='text' onChange={e => cb(e.target.value, ...ids, 'text')} value={data.text} />
      : null}
  </div>
);

export default class InputRadio extends React.Component {
  render() {
    return (
      <label htmlFor={this.props.name} >
        <span>
          <input
            id={this.props.name}
            type="radio"
            checked={this.props.checked}
            onChange={() => this.toggleCheck()} {...this.props}/>
          <span />
        </span>
        {this.props.label}
      </label>
    );
  }
}
