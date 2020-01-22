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
import { computed } from 'mobx';
import { observer, inject } from 'mobx-react';
import YearSelectButton from './YearSelectButton';
import TimeControlButtons from './TimeControlButtons';
import { ProgressBar } from '../AdminSTV/UploadWidget';

import './TimeControls.less';
import StepTimeButtons from './StepTimeButtons';

const TimeControlsGlobal = () => (
  <div className='time-controls'>
    <YearSelectButton />
    <TimeControlButtons />
    <StepTimeButtons />
  </div>
);

@inject('store')
@observer
class TimeControlsWrapper extends React.Component {
  @computed get courseId() {
    return this.props.store.courseSelection.courseId;
  }

  @computed get narrative() {
    return this.props.store.data.narratives.data[this.courseId] || {};
  }

  @computed get current() {
    return this.props.store.year.tick + 1;
  }

  @computed get narrations() {
    return this.props.store.year.narrations;
  }

  @computed get cards() {
    return Object.keys(this.narrations).length;
  }

  render() {
    return this.courseId !== 0 ? (
      <div className='time-controls' style={this.props.style}>
        <div className='text__narrative--header controls-text-shadow'>
          {this.narrative.title}
        </div>
        <TimeControlButtons back />
        <ProgressBar total={this.cards} current={this.current} />
        <div className='controls-text-shadow'>
          {this.current}
          {'/'}
          {this.cards}
          {' Cards'}
        </div>
      </div>
    ) : <TimeControlsGlobal />;
  }
}

TimeControlsWrapper.defaultProps = {
  style: {}
};

export default TimeControlsWrapper;
