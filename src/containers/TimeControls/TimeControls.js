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

import Button, { BUTTON_TYPE } from '../../components/Button/Button';

import {
  Prev, Next
} from './TimeControlsButtons';

import './TimeControls.less';

@inject('store')
@observer
class TimeControls extends React.Component {
  render() {
    return (
      <div className='timepanel__controls'>
        <Button btnType={BUTTON_TYPE.ICON} onClick={() => this.props.store.year.prevYear()}>
          <Prev />
        </Button>
        <YearSelectButton />
        <Button btnType={BUTTON_TYPE.ICON} onClick={() => this.props.store.year.nextYear()}>
          <Next />
        </Button>
      </div>
    );
  }
}

export default TimeControls;
