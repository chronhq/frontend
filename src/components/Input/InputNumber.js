import React from 'react';
import InputNumber from 'rc-input-number';

import './InputNumber.less';

export default class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      readOnly: false,
      value: 5
    }
  };
  toggleDisabled() {
    this.setState({
      disabled: !this.state.disabled,
    });
  }
  toggleReadOnly() {
    this.setState({
      readOnly: !this.state.readOnly,
    });
  }
  render() {
    const upHandler = (<div><span className="lnr lnr-chevron-up" /></div>);
    const downHandler = (<div><span className="lnr lnr-chevron-down" /></div>);
    return (
      <div>
        <InputNumber
          min={-8}
          max={10}
          value={this.state.value}
          style={{ width: 100 }}
          readOnly={this.state.readOnly}
          onChange={(e) => {
            this.setState({ value: Number(e.target.value) });
            this.props.cb({ [this.props.name]: Number(e.target.value) });
          }}
          disabled={this.state.disabled}
          upHandler={upHandler}
          downHandler={downHandler}
        />
      </div>
    );
  }
}


