import React from 'react';
import { observer, inject } from 'mobx-react';
import { computed, action } from 'mobx';
import Picker from 'rmc-picker';

import './Picker.less';
import './YearInput.less';

@inject('store')
@observer
class TypeOne extends React.Component {
  handlePress(event) {
    switch (event.key) {
      case 'Enter':
        this.props.cb(Number(this.props.now));
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <input
        type="text"
        pattern="[0-9]*"
        length={4}
        maxLength={4}
        value={this.props.now}
        onKeyDown={event => this.handlePress(event)}
        onChange={event => this.props.cb(event.target.value)}
        className='yearInput'
      />
    );
  }
}

@inject('store')
@observer
class YearInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false
    };
  }

  componentDidMount() {
    this.props.store.control.nowState = this.props.store.year.now;
  }

  onChange(value) {
    this.props.store.control.sync = false;
    this.props.store.control.nowState = value;
  }

  @computed get isValid() {
    if (this.props.store.control.nowState >= this.props.store.year.min
        && this.props.store.control.nowState <= this.props.store.year.max) {
      return true;
    }
    return false;
  }

  getItems(start, end) {
    const items = [];
    const len = end - start + 1;
    for (let i = start; i < start + len; i += 1) {
      items.push(
        <Picker.Item value={i} key={i} text={i}>
          {i}
        </Picker.Item>
      );
    }
    return items;
  }

  handleWheel(event) {
    // event.stopPropagation();

    this.props.store.control.sync = false;
    if (event.deltaY > 1) {
      // this.props.store.control.nowState += 1;
      (this.props.store.control.nowState <= this.props.store.year.max - 1)
        ? this.props.store.control.nowState += 1 : null;
    } else if (event.deltaY < 1) {
      // this.props.store.control.nowState -= 1;
      (this.props.store.control.nowState > this.props.store.year.min)
        ? this.props.store.control.nowState -= 1 : null;
    }
  }

  @action close() {
    this.props.store.flags.flags.runtime.yearInput = false;
    this.props.store.control.sync = true;
  }

  handleSet() {
    this.props.store.year.setYear(Number(this.props.store.control.nowState));
    this.props.store.control.sync = true;
    this.close();
  }

  render() {
    return (
      <div className='yearinput__window layer-3'>
        <div className={this.isValid ? 'yearinput__title' : 'yearinput__title yearinput__error'}>
          <TypeOne
            now={this.props.store.control.now}
            cb={value => this.onChange(value)}
          />
        </div>
        <div
          onWheel={e => this.handleWheel(e)}
        >
          <Picker
            selectedValue={this.props.store.control.nowState}
            disabled={this.state.disabled}
            defaultSelectedValue={this.props.store.control.now}
            onValueChange={v => this.onChange(v)}
          >
            {this.getItems(this.props.store.year.min, this.props.store.year.max)}
          </Picker>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <button
            onClick={() => this.handleSet()}
            type='button'
            disabled={this.isValid ? false : 'disabled'}
            className={this.isValid ? null : 'disabled'}
          >
            {this.props.store.i18n.buttons.set}
          </button>
          <button
            onClick={() => this.close()}
            type='button'
          >
            {this.props.store.i18n.buttons.dismiss}
          </button>
        </div>
      </div>
    );
  }
}

export default YearInput;
