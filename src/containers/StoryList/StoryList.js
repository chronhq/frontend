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
import { withRouter } from 'react-router-dom';

import StoryCard from '../StoryCard/StoryCard';
import './StoryList.less';

@inject('store')
@observer
class StoryList extends React.Component {
  @computed get courses() {
    return this.props.store.search.Narratives.entities;
  }

  @computed get lng() {
    return this.props.store.i18n.lng;
  }

  handleStorySelection(url) {
    this.props.store.courseSelection.cleanup();
    const course = this.props.store.courseSelection.find(url);
    this.props.store.courseSelection.select(course.id, course.url);
    this.props.history.push(`/${url}`);
  }

  render() {
    return (
      <div className='dashboard-content'>
        {Object.values(this.courses).map(story => (
          <StoryCard
            key={`card_${story.url}`}
            title={story.name[this.lng]}
            author={story.author[this.lng]}
            url={story.url}
            dates={[story.config.year.min, story.config.year.max]}
            cb={() => this.handleStorySelection(story.url)}
          />
        ))}
      </div>
    );
  }
}

export default withRouter(StoryList);