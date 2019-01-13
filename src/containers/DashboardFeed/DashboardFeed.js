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
import { inject, observer } from 'mobx-react';
import { computed } from 'mobx';

import NarrativeEvent from '../../components/NarrativeEvent/NarrativeEvent';
import './DashboardFeed.less';

@inject('store')
@observer
class DashboardFeed extends React.Component {
  @computed get timeline() {
    return this.props.store.search.Narrations.entities;
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
      <div className='dashboard-content'>
        <h2>
          {Object.keys(this.timeline).map(event => (
            event !== null && (
              <NarrativeEvent
                key={`events_${event}`}
                event={this.timeline[event]}
                cb={v => this.props.store.year.setTick(v)} // event.tick in value
                currentTick={this.tick}
              />
            )
          ))}
        </h2>
      </div>
    );
  }
}

export default DashboardFeed;