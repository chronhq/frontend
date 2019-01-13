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
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { computed } from 'mobx';
import PropTypes from 'prop-types';

import RateBar from '../RateBar/RateBar';
import './CurrentStory.less';

@inject('store')
@observer
class CurrentStory extends Component {
  @computed get courses() {
    return this.props.store.data.Courses.data;
  }

  @computed get lng() {
    return this.props.store.i18n.lng;
  }

  @computed get dashboard() {
    return this.props.store.i18n.data.dashboard;
  }

  handleTitleEnter(e) {
    if (e.keyCode === 13) {
      this.props.changeUi(e);
    }
  }

  render() {
    return (
      <div className='currentstory'>
        {this.props.isStorySelected
          && (
            <button
              type='button'
              className='currentstory__return'
              onClick={e => this.props.changeUi(e)}
            >
              <i className='lnr lnr-chevron-left' aria-hidden='true' />
              {this.dashboard.back}
            </button>
          )}
        <div
          className='currentstory--title'
          role='button'
          tabIndex={0}
          onClick={e => this.props.changeUi(e)}
          onKeyDown={e => this.handleTitleEnter(e)}
        >
          {(this.props.store.courseSelection.courseId !== null)
            ? this.courses[this.props.store.courseSelection.courseId].name[this.lng]
            : ''
          }
        </div>
        <RateBar />
      </div>
    );
  }
}

CurrentStory.propTypes = {
  changeUi: PropTypes.func.isRequired,
  isStorySelected: PropTypes.bool.isRequired
};

export default CurrentStory;
