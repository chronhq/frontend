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
import YearSelectButton from './YearSelectButton';

import {
  Reset, Prev, Play, Pause, Next
} from './TimeControlsButtons';

import './TimeControls.less';

@inject('store')
@observer
class TimeControls extends React.Component {
  render() {
    return (
      <div className='timepanel__controls'>
        <button type='button' onClick={() => this.props.store.year.resetYear()}>
          <Reset />
        </button>
        <button type='button' onClick={() => this.props.store.year.prevYear()}>
          <Prev />
        </button>
        <button type='button' onClick={() => this.props.store.year.togglePlay()}>
          {this.props.store.year.playing
            ? <Pause />
            : <Play />
          }
        </button>
        <button type='button' onClick={() => this.props.store.year.nextYear()}>
          <Next />
        </button>
        <YearSelectButton />
      </div>
    );
  }
}

export default TimeControls;
