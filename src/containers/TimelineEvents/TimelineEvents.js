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
import { inject, observer } from 'mobx-react';
import { computed } from 'mobx';

import Event from '../../components/Event/Event';
import './TimelineEvents.less';

@inject('store')
@observer
class TimelineEvents extends React.Component {
  @computed get timeline() {
    return this.props.store.data.CourseTimelines.data;
  }

  @computed get tick() {
    return this.props.store.year.tick;
  }

  handleWheel = (event) => {
    if (event.deltaY > 1) {
      this.props.store.year.nextTick();
    } else if (event.deltaY < -1) {
      this.props.store.year.prevTick();
    }
  }

  render() {
    return (
      <div
        className='event__container'
        onWheel={this.handleWheel}
      >
        {Object.keys(this.timeline).map(event => (
          event !== null && (
            <Event
              key={`events_${event}`}
              event={this.timeline[event]}
              cb={v => this.props.store.year.setTick(v)} // event.tick in value
              currentTick={this.tick}
            />
          )))}
      </div>
    );
  }
}

export default TimelineEvents;
