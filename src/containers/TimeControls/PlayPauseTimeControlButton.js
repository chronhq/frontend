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
import TimeControlButton from './GenericTimeControlButton';

@inject('store')
@observer
class PlayPauseButton extends React.Component {
  @computed get isPlaying() {
    return this.props.store.year.playing;
  }

  control = () => {
    this.props.store.year.togglePlay();
    this.props.store.analytics.metricHit('play_button');
  }

  render() {
    return (
      <TimeControlButton
        icon={this.isPlaying ? 'pause' : 'play'}
        control={this.props.control}
        action={this.control}
      />
    );
  }
}

export default PlayPauseButton;
