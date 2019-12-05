/*
 * Chron.
 * Copyright (c) 2019 Alisa Belyaeva, Ata Ali Kilicli, Amaury Martiny,
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
import { computed, observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';
import TimeControlButton from './GenericTimeControlButton';
import Button, { BUTTON_TYPE, BUTTON_SIZE } from '../../components/Button/Button';


@inject('store')
@observer
class StepTimeButtons extends React.Component {
  @observable steps = [[10, 10], [50, 50], [10000, 'MAX']]

  @observable selected = 1;

  @computed get step() {
    return this.steps[this.selected][0];
  }

  @computed get label() {
    return this.steps[this.selected][1];
  }

  @computed get year() {
    return this.props.store.year;
  }

  makeStep = (forward = false) => {
    const step = forward ? this.step : this.step * -1;
    const next = this.year.year + step;
    if (this.year.limits.min > next) {
      this.year.setYear(this.year.limits.min);
    } else if (this.year.limits.max < next) {
      this.year.setYear(this.year.limits.max);
    } else {
      this.year.setYear(next);
    }
  }

  @action changeStep() {
    if (this.selected === this.steps.length - 1) {
      this.selected = 0;
    } else {
      this.selected += 1;
    }
  }

  render() {
    return (
      <div className='time-controls__buttons'>
        <TimeControlButton
          icon='step-backward'
          control={this.props.control}
          action={() => this.makeStep(false)}
        />
        <Button
          id='yearInputButton'
          btnType={BUTTON_TYPE.ICON}
          btnSize={BUTTON_SIZE.HUGE}
          onClick={() => this.changeStep()}
        >
          <span style={{ fontWeight: 400 }}>
            {this.label}
          </span>
        </Button>
        <TimeControlButton
          icon='step-forward'
          control={this.props.control}
          action={() => this.makeStep(true)}
        />
      </div>
    );
  }
}

export default StepTimeButtons;
