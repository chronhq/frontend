import React from 'react';
import { observer, inject } from 'mobx-react';
import { computed, observable } from 'mobx';
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
  @observable disabled = false;

  @computed get items() {
    const { min: start, max: end } = this.props.store.year;
    const len = end - start;
    return new Array(len).fill(start).map((v, i) => {
      const y = v + i;
      return (
        <Picker.Item value={y} key={y} text={y}>
          {y}
        </Picker.Item>
      );
    });
  }

  @computed get className() {
    return this.props.store.year.tuneIsValid
      ? 'yearinput__title'
      : 'yearinput__title yearinput__error';
  }

  handleWheel = (event) => {
    this.props.store.year.followWheel(event.deltaY);
  }

  close = () => {
    this.props.store.flags.runtime.set('yearInput', false);
    this.props.store.year.resetTuneValue();
  }

  saveTuneValue = value => this.props.store.year.setTuneValue(value);

  handleSet = () => {
    this.props.store.year.saveTuneValue();
    this.close();
  }

  render() {
    return (
      <div className='yearinput__window layer-3'>
        <div className={this.className}>
          <TypeOne
            now={this.props.store.year.tuneValue}
            cb={this.saveTuneValue}
          />
        </div>
        <div
          onWheel={this.handleWheel}
        >
          <Picker
            selectedValue={this.props.store.year.tuneValue}
            disabled={this.disabled}
            defaultSelectedValue={this.props.store.year.tuneValue}
            onValueChange={this.saveTuneValue}
          >
            {this.items}
          </Picker>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <button
            onClick={this.handleSet}
            type='button'
            disabled={this.props.store.year.tuneIsValid ? false : 'disabled'}
            className={this.props.store.year.tuneIsValid ? null : 'disabled'}
          >
            {this.props.store.i18n.data.buttons.set}
          </button>
          <button
            onClick={this.close}
            type='button'
          >
            {this.props.store.i18n.data.buttons.dismiss}
          </button>
        </div>
      </div>
    );
  }
}

export default YearInput;
