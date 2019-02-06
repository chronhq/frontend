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
import { when, toJS } from 'mobx';

@inject('store')
@observer
class Wrapper extends React.Component {
  componentDidMount() {
    this.props.store.analytics.metricHit(this.props.story);
    this.props.store.courseSelection.cleanup();
    when( // validate course name and download data
      () => this.props.store.data.Courses.status.loaded,
      () => this.validateCourses()
    );
  }

  selectCourse() {
    const course = this.props.store.courseSelection.find(this.props.story);
    if (course !== undefined) {
      const fake = this.props.fake || null;
      this.props.store.courseSelection.select(course.id, course.url, fake);
    } else {
      this.props.history.push('/404');
    }
  }

  validateCourses() {
    const errorPages = {
      404: 'Not Found', 502: 'Gateway timeout', 504: 'Bad Gateway'
    };
    const error = toJS(this.props.store.data.Courses.status.error);
    if (error !== null && errorPages[toJS(error.status)] !== undefined) {
      this.props.history.push(`/${toJS(error.status)}`);
    }
    if (this.props.story !== 'CourseSelection') {
      this.selectCourse();
    }
  }

  render() {
    return (
      <div className='content'>
        {this.props.children}
      </div>
    );
  }
}

export default withRouter(Wrapper);
