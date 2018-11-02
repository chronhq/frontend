import React from 'react';
import { observer, inject } from 'mobx-react';

import Select, { Option } from 'rc-select';

import './Select.less';

// const count = 1700;
// const len = 316;

@inject('store')
@observer
class YearSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      options: this.getOptions(this.props.store.year.min, this.props.store.year.max)
    };
  }

  onSelect(value) {
    this.props.store.year.setYear(Number(value));
  }

  getOptions(start, end) {
    const options: any[] = [];
    const len = end - start;
    for (let i = start; i < start + len; i++) {
      options.push(
        <Option value={i} key={i} text={String(i)}>
          {i}
        </Option>
      );
    }
    return options;
  }

  render() {
    return (
      <Select
        disabled={this.state.disabled}
        style={{ width: '100px' }}
        onSelect={v => this.onSelect(v)}
        notFoundContent=""
        dropdownMenuStyle={{ maxHeight: 400 }}
        placeholder={this.props.store.year.now}
        value={this.props.store.year.now}
        backfill
      >
        {this.state.options}
      </Select>
    );
  }
}

export default YearSelect;
