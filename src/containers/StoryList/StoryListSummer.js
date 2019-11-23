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
import { computed, observable } from 'mobx';
import { withRouter } from 'react-router-dom';

import StoryCard from '../../components/StoryCard/StoryCard';
import './StoryListSummer.less';

@inject('store')
@observer
class StoryList extends React.Component {
  @observable shiftX = 0;

  @computed get maxShit() { // it's a negative value
    if (this.ref === undefined && this.ref !== null) return 0;
    return this.props.store.deck.width - this.ref.offsetWidth - this.props.store.remToPixel(2);
  }

  @computed get translateX() {
    if (this.shiftX > 0) return 0;
    if (this.shiftX < this.maxShit) return this.maxShit;
    return this.shiftX;
  }

  @computed get courses() {
    return this.props.store.search.Narratives.entities;
  }

  @computed get enabled() {
    return this.props.store.courseSelection.courseId === 0;
  }

  handleStorySelection = (url) => {
    this.props.store.courseSelection.handleSelect(url, this.props.history);
  }

  handleWheel = (event) => {
    const delta = event.deltaY || event.deltaX;
    if (delta === 0) return null;
    this.shiftX = this.translateX - delta;
    return true;
  }

  render() {
    return this.enabled ? (
      <div
        className='story-list'
        // ref={'storyList'}
        ref={(r) => { this.ref = r; return false; }}
        onWheel={this.handleWheel}
        style={{ transform: `translateX(${this.translateX}px)` }}
      >
        {Object.values(this.courses).map((story) => (
          <StoryCard
            key={`card_${story.url}`}
            story={story}
            handleStorySelection={this.handleStorySelection}
          />
        ))}
      </div>
    ) : null;
  }
}

export default withRouter(StoryList);
