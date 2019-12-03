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
import { computed } from 'mobx';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import TimeControlButton from './GenericTimeControlButton';

@inject('store')
@observer
class BackFromRegimeButton extends React.Component {
  @computed get overview() {
    return this.props.store.year.tick === -1;
  }

  @computed get metric() {
    return this.overview ? 'narrative_back' : 'narrative_open';
  }

  control = () => {
    this.props.store.year.togglePlay(false);
    const res = this.overview
      ? this.props.store.courseSelection.handleSelect('world', this.props.history)
      : this.props.store.year.setTick(-1);
    this.props.store.analytics.metricHit(this.metric);
    return res;
  }

  render() {
    return (
      <TimeControlButton
        icon={this.props.icon}
        control={this.props.control}
        action={this.control}
      />
    );
  }
}

export default withRouter(BackFromRegimeButton);
