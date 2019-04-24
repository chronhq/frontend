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
  Prev, Next, Play
} from './TimeControlsButtons';

import './TimeControls.less';

@inject('store')
@observer
class TimeControlButton extends React.Component {
  render() {
    const Icon = this.props.icon;
    return (
      <Button
        btnType={BUTTON_TYPE.ICON}
        onClick={() => {
          this.props.store.year[this.props.control]();
          this.props.store.analytics.metricHit('year_change');
        }}
      >
        <Icon />
      </Button>
    );
  }
}

const PrevYear = () => <TimeControlButton icon={Prev} control='prevYear' />;

const NextYear = () => <TimeControlButton icon={Next} control='nextYear' />;

const PlayYear = () => <TimeControlButton icon={Play} control='nextYear' />;

const TimeControls = () => (
  <div className='time-controls'>
    <YearSelectButton />
    <div className='time-controls--buttons'>
      <PrevYear />
      <PlayYear />
      <NextYear />
    </div>
  </div>
);

export {
  PrevYear,
  NextYear,
  PlayYear,
};

export default TimeControls;
