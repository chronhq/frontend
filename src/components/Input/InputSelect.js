import React, { Component } from 'react';
import Select, { Option } from 'rc-select';
import PropTypes from 'prop-types';

class InputSelect extends Component {
  defaultProps = {
    value: this.props.placeholder
  }

  render() {
    return (
      <Select
        // disabled={this.state.disabled}
        style={{ width: '220px' }}
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

InputSelect.propTypes = {
  value: PropTypes.string, //TODO
  placeholder: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired,
  cb: PropTypes.func.isRequired
};


export default InputSelect;
