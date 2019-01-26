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
import { runInAction } from 'mobx';

import Narrative from './Narrative';

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
      min: 2019,
      max: 2019,
      now: 2019,
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

@inject('store')
@observer
class About extends React.Component {
  constructor(props) {
    super(props);

    runInAction(() => {
      this.props.store.data.Courses.data[-1] = about;
    });
  }

  render() {
    return (
      <Narrative story='about' fake='0' />
    );
  }
}

export default About;
