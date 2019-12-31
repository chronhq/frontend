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
import { computed, action, observable } from 'mobx';
import { withRouter } from 'react-router-dom';

import StoryCard, { StoryCardInfo } from '../../components/StoryCard/StoryCard';
import './StoryListSummer.less';

@inject('store')
@observer
class StoryList extends React.Component {
  @observable hover = false;

  @observable story = { author: '', description: '' };

  @observable box;

  @computed get courses() {
    return this.props.store.search.Narratives.entities;
  }

  @computed get enabled() {
    return this.props.store.courseSelection.courseId === 0;
  }

  @computed get style() {
    return this.box
      ? {
        zIndex: 2,
        position: 'fixed',
        left: this.box.left,
        top: this.box.top,
        width: this.box.width,
        transform: 'translateY(calc(-100% - .5rem))',
      }
      : {};
  }

  @action setHover = (h, story, ref) => {
    this.hover = h;
    this.story = story;
    this.box = ref.getBoundingClientRect();
  }

  handleStorySelection = (url) => {
    this.props.store.courseSelection.handleSelect(url, this.props.history);
  }

  render() {
    return this.enabled ? (
      <>
        <StoryCardInfo hover={this.hover} story={this.story} style={this.style} />
        <div className='story-list'>
          {Object.values(this.courses).map((story) => (
            <StoryCard
              setHover={this.setHover}
              key={`card_${story.url}`}
              story={story}
              handleStorySelection={this.handleStorySelection}
            />
          ))}
        </div>
      </>
    ) : null;
  }
}

export default withRouter(StoryList);
