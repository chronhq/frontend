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
import Narrative from './SummerNarrative';

const mapSettings = buildMapSettings({
  zoom_min: 1, zoom_max: 7.5, coordinates: [[0, 0], [0, 0]]
});

const createTick = year => (e, idx) => ({
  map_datetime: String(year),
  order: idx,
  courseId: -1,
  title: e.text,
  description: '',
  date_label: e.date,
  id: idx
});

const newPoint = p => ({ img: 26, loc: p });

const timeline = [{
  date: '7 March 2017',
  text: 'Chronist team launched first demo'
}, {
  date: '11 November 2017',
  text: 'First narrative made by Chronist'
}, {
  date: '12 January 2018',
  text: 'Launch of first demo by ChronoScio announced by Ollie Bye'
}, {
  date: '6 July 2018',
  text: ['With the addition of new members,',
    'ChronoScio team started to work on the second iteration of their website'].join(' ')
}, {
  date: '1 August 2018',
  text: 'Chronist team published 220 years of world history maps'
}, {
  date: '9 September 2018',
  text: 'ChronoScio team began mapping past 1789'
}, {
  date: '19 October 2018',
  text: 'ChronoScio and Chronist teams came together'
}, {
  date: '26 February 2019',
  text: 'United Chron team launched first demo'
}, {
  date: 'Now',
  text: ['We are a community of enthusiasts behind Chron.',
    'We live in a different parts of the world',
    'but are united by passion for historical geography'].join(' ')
}];

const points = [
  { x: 33.044167, y: 34.674722 }, // Limassol
  { x: -122.416667, y: 37.783333 }, // San Francisco
  { x: 2.3508, y: 48.8567 }, // Paris
  { x: 37.616667, y: 55.75 }, // Moscow
  { x: 30.308611, y: 59.9375 }, // Saint-Petersburg
  { x: -71.063611, y: 42.358056 }, // Boston
  { x: 32.866667, y: 39.933333 }, // Ankara
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

    // last mapped year
    const year = this.props.store.data.narratives.data[0].end_year;

    // Create a fake course
    const about = buildNarrative({
      start_year: year, end_year: year, url: 'about', title: 'About Us', mapSettings
    });

    const ticks = timeline.map(createTick(year));

    // clean data from previous selected narrative
    this.props.store.courseSelection.cleanup();
    runInAction(() => {
      this.props.store.data.narratives.data[-1] = about;
    });

    when( // wait for course selection and add text
      () => this.props.store.courseSelection.courseId === -1,
      () => runInAction(() => {
        this.props.store.data.narrations.flatGenCb(ticks);
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
