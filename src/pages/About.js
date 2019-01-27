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
import { runInAction, when } from 'mobx';

import Narrative from './Narrative';

const date = new Date();
const year = date.getUTCFullYear();

// Create a fake course
const about = {
  url: 'about',
  id: -1,
  name: {
    ru: 'О нас',
    en: 'About us'
  },
  author: { ru: '', en: '' },
  config: {
    year: {
      min: year,
      max: year,
      now: year,
      tick: 1,
    },
    projection: {
      clip: [[-180, 90], [180, -90]],
      rotate: [0, 0, 0],
      center: [0, 0]
    },
    settings: {
      flags: {
        zoom: {
          minScale: 1,
          maxScale: 7.5
        }
      }
    }
  }
};

const text = ['We are a community of enthusiasts behind Chron.',
  'We live in a different parts of the world',
  'but are united by passion for historical geography.',
  'Find us on https://github.com/chronqh'].join(' ');

const tick = {
  year,
  tick: 1,
  courseId: -1,
  title: '',
  description: text,
  persons: [],
  cities: [],
  id: -1
};


@inject('store')
@observer
class About extends React.Component {
  constructor(props) {
    super(props);

    runInAction(() => {
      this.props.store.data.Courses.data[-1] = about;
    });

    when( // wait for course selection and add text
      () => this.props.store.courseSelection.courseId === -1,
      () => runInAction(() => {
        console.log('when action is running');
        // console.log('Status', this.props.store.data.CourseTimelines.status.loaded);
        this.props.store.data.CourseTimelines.data[-1] = tick;
        return true;
      })
    );
  }

  render() {
    return (
      <Narrative story='about' fake='0' />
    );
  }
}

export default About;
