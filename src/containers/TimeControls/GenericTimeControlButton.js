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
import { observer, inject } from 'mobx-react';

import Button, { BUTTON_TYPE } from '../../components/Button/Button';

@inject('store')
@observer
class GenericTimeControlButton extends React.Component {
  render() {
    const { icon } = this.props;
    const clickAction = () => {
      const mod = this.props.store.courseSelection.courseId ? 'Tick' : 'Year';
      const control = `${this.props.control}${mod}`;
      const metric = `${mod.toLocaleLowerCase()}_change`;
      this.props.store.year[control]();
      this.props.store.analytics.metricHit(metric);
    };
    return (
      <Button
        btnType={BUTTON_TYPE.ICON}
        onClick={this.props.action || clickAction}
      >
        <div className={`time-controls__button-size icon icon__shadow--soft icon-${icon}`} />
      </Button>
    );
  }
}

export default GenericTimeControlButton;
