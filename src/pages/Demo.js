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

import World from './World';

@inject('store')
@observer
class Demo extends React.Component {
  constructor(props) {
    super(props);
    // Create a fake course
    const demo = this.props.store.data.Courses.data[0];
    demo.config.year = {
      min: 1789,
      max: 1789,
      now: 1789,
      tick: 1, // does not really matter
    };
    demo.config.settings.flags.zoom.minScale = 4;

    // Clip is the only possibility to set up the camera position right now
    demo.config.projection.clip = [[-10, 60], [30, 40]];
    runInAction(() => {
      this.props.store.data.Courses.data[0] = demo;
      this.props.store.courseSelection.select(0, 'world');
    });
  }

  render() {
    return (
      <World />
    );
  }
}

export default Demo;
