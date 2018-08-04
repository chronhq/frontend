import React from 'react';
import InputNumber from 'rc-input-number';
import './InputNumber.less';

class Component extends React.Component {
  render() {
    const upHandler = (
      <div>
        <span className="lnr lnr-chevron-up" />
      </div>
    );
    const downHandler = (
      <div>
        <span className="lnr lnr-chevron-down" />
      </div>
    );
    return (
      <InputNumber
        min={this.props.min}
        max={this.props.max}
        value={this.props.value}
        placeholder={this.props.placeholder}
        style={{ width: 100 }}
        onChange={v => this.props.cb(v)}
        disabled={this.props.disabled}
        upHandler={upHandler}
        downHandler={downHandler}
      />
    );
  }
}

export default Component;
