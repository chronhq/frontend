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

// import NarrativeEvent from '../../components/NarrativeEvent/NarrationInfo';
import './NarrativeOverview.less';
import DashboardSearch from '../../components/InputText/DashboardSearch';

const NarrationPreview = ({ date, text, action }) => (
  <div
    role='button'
    tabIndex={0}
    onClick={action}
    // onMouseEnter={action}
    onKeyPress={action}
    className='float-container narration-preview'
  >
    <div className='text__narrative--date narration-preview__date'>
      {date}
    </div>
    <div className='text__narrative--body narration-preview__text'>
      {text}
    </div>
  </div>
);

@inject('store')
@observer
class NarrativeOverview extends React.Component {
  @computed get tick() {
    return this.props.store.year.tick;
  }

  @computed get narrations() {
    return this.props.store.search.Narrations.entities;
    // return this.props.store.year.narrations;
  }

  @computed get order() {
    return Object.keys(this.narrations).sort((a, b) => Number(a) > Number(b));
  }

  @computed get disabled() {
    return (this.tick !== -1);
  }

  render() {
    return this.disabled ? null : (
      <div className='narrative-overview__container'>
        <DashboardSearch />
        <div className='narrative-overview'>
          {this.order.map((id) => (
            <NarrationPreview
              key={`npreview-${id}`}
              date={this.narrations[id].date_label}
              text={this.narrations[id].title}
              action={() => this.props.store.year.setTick(Number(id))}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default NarrativeOverview;
