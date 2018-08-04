import React from 'react';
import Select, { Option } from 'rc-select';
import './Select.less';

class InputSelect extends React.Component {
  render() {
    console.log('placeholder:', this.props.placeholder);
    return (
      <Select
        // disabled={this.state.disabled}
        style={{ width: '180px' }}
        onSelect={v => this.props.cb(v)}
        notFoundContent={false}
        dropdownMenuStyle={{ maxHeight: 400 }}
        placeholder={this.props.placeholder}
        value={this.props.value}
        backfill
      >
        {Object.keys(this.props.options).map(key => (
          <Option value={this.props.options[key]} key={key} text={this.props.options[key]}>
            {this.props.options[key]}
          </Option>
        ))
        }
      </Select>
    );
  }
}
export default InputSelect;
