/*
 * Chron.
 * Copyright (c) 2018 Alisa Belyaeva, Ata Ali Kilicli, Amaury Martiny,
 * Daniil Mordasov, Liam O’Flynn, Mikhail Orlov.
 * -----
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * -----
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * -----
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
import React from 'react';
import { observer, inject } from 'mobx-react';
import { computed, observable } from 'mobx';
import Picker from 'rmc-picker';

import Button, { BUTTON_COLOR, BUTTON_SIZE } from '../../components/Button/Button';
import ModalWrapper from '../../components/ModalWrapper';

import './Picker.less';
import './YearInput.less';

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

  // {/* onKeyDown={event => this.handlePress(event)} */}
  render() {
    return (
      <input
        type="number"
        pattern="[0-9]*"
        length={4}
        maxLength={4}
        min={this.props.limits.min}
        max={this.props.limits.max}
        value={this.props.now}
        onChange={event => this.props.cb(event.target.value)}
        className='yearinput__input'
      />
    );
  }
}

@inject('store')
@observer
class YearInput extends React.Component {
  @observable disabled = false;

  @computed get items() {
    const { min: start, max: end } = this.props.store.year.limits;
    const len = end - start;
    if (Number.isNaN(len) || len < 1) return null;
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

  @computed get isOpen() {
    return this.props.store.flags.runtime.get('yearInput');
  }

  handleWheel = (event) => {
    this.props.store.year.followWheel(event.deltaY);
  }

  close = (e = { target: { id: '' } }) => {
    this.props.store.year.resetTuneValue();
    // prevent flickering when pressed on open button
    if (e.target.id !== 'yearInputButton' && e.target.id !== 'yearInputText') {
      this.props.store.flags.runtime.set('yearInput', false);
    }
  }

  setTuneValue = value => this.props.store.year.setTuneValue(value)

  handleSave = () => {
    this.props.store.year.saveTuneValue();
    this.close();
  }

  render() {
    return (
      <ModalWrapper className='yearinput__window' close={this.close} isOpen={this.isOpen}>
        <div className={this.className}>
          <TypeOne
            now={this.props.store.year.tuneValueG}
            cb={this.setTuneValue}
            limits={this.props.store.year.limits}
          />
        </div>
        <div
          onWheel={this.handleWheel}
        >
          <Picker
            selectedValue={this.props.store.year.tuneValueG}
            disabled={this.disabled}
            defaultSelectedValue={this.props.store.year.tuneValueG}
            onValueChange={this.setTuneValue}
          >
            {this.items}
          </Picker>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button
            onClick={this.handleSave}
            btnColor={BUTTON_COLOR.LIGHT}
            btnSize={BUTTON_SIZE.WIDE}
            disabled={!this.props.store.year.tuneIsValid}
          >
            {this.props.store.i18n.data.buttons.set}
          </Button>
          <Button
            btnSize={BUTTON_SIZE.WIDE}
            btnColor={BUTTON_COLOR.LIGHT}
            onClick={this.close}
          >
            {this.props.store.i18n.data.buttons.dismiss}
          </Button>
        </div>
      </ModalWrapper>
    );
  }
}

export default YearInput;
