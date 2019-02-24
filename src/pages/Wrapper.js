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
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import {
  when, toJS, computed, observable
} from 'mobx';

import LoadingLogo from '../containers/LoadingLogo';

@inject('store')
@observer
class Wrapper extends React.Component {
  @observable mapLoaded = false;

  componentDidMount() {
    this.metricHit();
    when( // validate course name and download data
      () => this.props.store.data.narratives.status.loaded || this.props.story === 'world',
      () => this.checkForErrors('narratives', () => this.selectCourse())
    );
    // TODO test against various conditions
    this.props.store.data.camelDeps.base.map(d => when(
      () => this.props.store.data[d].status.loaded,
      () => this.checkForErrors(d)
    ));

    when(
      () => this.props.store.deck.loadingStatus,
      () => {
        this.mapLoaded = true;
      }
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.story !== prevProps.story) {
      this.metricHit();
    }
  }

  @computed get loadingBaseData() {
    return (!(this.mapLoaded
      && this.props.store.data.narratives.status.loaded
      && this.props.store.data.camelDeps.base
        .every(d => this.props.store.data[d].status.loaded)
    ));
  }

  metricHit = () => {
    let metric = this.props.metric || 'narrative_open';
    if (this.props.story === 'world') metric = 'main_open';
    this.props.store.analytics.metricHit(metric);
  }

  selectCourse() {
    const course = this.props.store.courseSelection.find(this.props.story);
    if (course !== undefined) {
      const fake = this.props.fake || null;
      this.props.store.courseSelection.select(course.id, course.url, fake);
    } else {
      this.props.store.analytics.metricHit('404');
      this.props.history.push('/404');
    }
  }

  checkForErrors(d, cb = () => '') {
    const errorPages = {
      404: 'Not Found', 502: 'Gateway timeout', 504: 'Bad Gateway'
    };
    const error = toJS(this.props.store.data[d].status.error);
    if (error !== null && errorPages[toJS(error.status)] !== undefined) {
      this.props.store.analytics.metricHit(toJS(error.status));
      this.props.history.push(`/${toJS(error.status)}`);
      return;
    }
    cb();
  }

  render() {
    return (
      <div className='content'>
        {this.loadingBaseData && <LoadingLogo />}
        {this.props.children}
      </div>
    );
  }
}

export default withRouter(Wrapper);
