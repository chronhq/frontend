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

import { buildNarrative, buildMapSettings } from '../FakeNarrativeBuilder';
import Narrative from './Narrative';

const year = 1789;

const mapSettings = buildMapSettings({
  zoom_min: 4, zoom_max: 7.5, coordinates: [[50, 5], [50, 5]]
});

// Create a fake course
const demo = buildNarrative({
  start_year: year, end_year: year, url: 'demo', name: 'EADH 2018 Demo', mapSettings
});

@inject('store')
@observer
class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.props.store.wikistore.battles.add([
      'Q1025134', 'Q898338', 'Q2234632', 'Q10671369',
      'Q4871992', 'Q4872085', 'Q2564536', 'Q6539', 'Q1527921'], false);

    const birth = ['Q61987', 'Q1069841', 'Q1585', 'Q161145', 'Q8814'];
    const death = ['Q729541', 'Q496775', 'Q473506', 'Q315819', 'Q860155'];
    this.props.store.wikistore.actors.add([...death, ...birth], false);

    this.props.store.wikistore.documents.add(['Q169759'], false);

    this.props.store.wikistore.fetchAll();

    runInAction(() => {
      this.props.store.data.narratives.data[-1] = demo;
    });
  }

  render() {
    return (
      <Narrative story='demo' fake='0' />
    );
  }
}

export default Demo;
