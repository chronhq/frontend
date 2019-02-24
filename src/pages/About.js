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

import { buildNarrative, buildMapSettings } from '../FakeNarrativeBuilder';
import Narrative from './Narrative';

const date = new Date();
const year = date.getUTCFullYear();

const mapSettings = buildMapSettings({
  zoom_min: 1, zoom_max: 7.5, coordinates: [[0, 0], [0, 0]]
});

// Create a fake course
const about = buildNarrative({
  start_year: year, end_year: year, url: 'about', name: 'About Us', mapSettings
});

const text = ['We are a community of enthusiasts behind Chron.',
  'We live in a different parts of the world',
  'but are united by passion for historical geography.',
  'Find us on https://github.com/chronhq'].join(' ');

const tick = {
  year,
  order: 0,
  courseId: -1,
  title: '',
  description: text,
  persons: [],
  cities: [],
  id: -1
};

const newPoint = p => ({ img: 26, loc: p });

const points = [
  { x: 33.044167, y: 34.674722 }, // Limassol
  { x: -122.416667, y: 37.783333 }, // San Francisco
  { x: 2.3508, y: 48.8567 }, // Paris
  { x: 37.616667, y: 55.75 }, // Moscow
  { x: 30.308611, y: 59.9375 }, // Saint-Petersburg
  { x: -71.063611, y: 42.358056 }, // Boston
  { x: 32.866667, y: 39.933333 }, // Turkey
  { x: -93.093611, y: 44.944167 }, // Minnesota
  { x: 4.9, y: 52.366667 }, // Amsterdam
  { x: 5.783333, y: 53.2 }, // Leeuwarden
  { x: 13.388889, y: 52.516667 }, // Berlin
  { x: -122.272778, y: 37.871667 }, // Berkeley
].map(newPoint);

@inject('store')
@observer
class About extends React.Component {
  constructor(props) {
    super(props);

    runInAction(() => {
      this.props.store.data.narratives.data[-1] = about;
    });

    when( // wait for course selection and add text
      () => this.props.store.courseSelection.courseId === -1,
      () => runInAction(() => {
        this.props.store.data.narrations.data[-1] = tick;
        this.props.store.pins.addDummyPins(points, false);
        return true;
      })
    );
  }

  render() {
    return (
      <Narrative story='about' fake='0' metric='check_about' />
    );
  }
}

export default About;
