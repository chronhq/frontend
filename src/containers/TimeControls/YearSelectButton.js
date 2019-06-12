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
import Button, { BUTTON_TYPE, BUTTON_SIZE } from '../../components/Button/Button';

@inject('store')
@observer
class YearButton extends React.Component {
  toggle = () => {
    this.props.store.flags.runtime.toggle('yearInput');
    this.props.store.analytics.metricHit('year_change');
  }

  // ids are important for correct closing of Modal window of YearInput
  render() {
    return (
      <Button
        id='yearInputButton'
        btnType={BUTTON_TYPE.ICON}
        btnSize={BUTTON_SIZE.HUGE}
        onClick={this.toggle}
      >
        <span id='yearInputText' className='time-controls__year'>
          {String(this.props.store.year.tuneValueG)}
        </span>
      </Button>
    );
  }
}

export default YearButton;
