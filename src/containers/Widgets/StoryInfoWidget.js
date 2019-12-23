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

import { StoryCardInfo } from '../../components/StoryCard/StoryCard';

@inject('store')
@observer
class StoryInfoWidget extends React.Component {
  @computed get courseId() {
    return this.props.store.courseSelection.courseId;
  }

  @computed get story() {
    return this.props.store.data.narratives.data[this.courseId];
  }

  @computed get enabled() {
    return this.props.store.year.tick === -1 && this.story !== undefined;
  }

  render() {
    return this.enabled && (
      <StoryCardInfo
        story={this.story}
        hover
        style={this.props.style}
      />
    );
  }
}

export default StoryInfoWidget;
