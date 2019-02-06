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

import SideBar from '../templates/SideBar/SideBar';
import NarrativeMobileBar from '../templates/NarrativeMobileBar/NarrativeMobileBar';
import TimePanel from '../templates/TimePanel/TimePanel';
import Overlays from '../templates/Overlays/Overlays';
import Widgets from '../containers/Widgets';
import Balloon from '../containers/Balloon';
import GeoLayers from '../containers/GeoLayers';
import Wrapper from './Wrapper';

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
    // Centring map on Europe. Coordinates are in [long, lat] format
    demo.config.projection.center = [5, 50];
    this.props.store.wikistore.battles.add([
      'Q1025134', 'Q898338', 'Q2234632', 'Q10671369',
      'Q4871992', 'Q4872085', 'Q2564536', 'Q6539', 'Q1527921'], false);

    const birth = ['Q61987', 'Q1069841', 'Q1585', 'Q161145', 'Q8814'];
    const death = ['Q729541', 'Q496775', 'Q473506', 'Q315819', 'Q860155'];
    this.props.store.wikistore.actors.add([...death, ...birth], false);

    this.props.store.wikistore.documents.add(['Q169759'], false);

    this.props.store.wikistore.fetchAll();

    runInAction(() => {
      this.props.store.data.Courses.data[0] = demo;
      this.props.store.courseSelection.select(0, 'world');
    });
  }

  render() {
    return (
      <Wrapper story='world'>
        <Widgets />
        <NarrativeMobileBar />
        <SideBar />
        <Overlays />
        <TimePanel />
        <Balloon />
        <GeoLayers />
      </Wrapper>
    );
  }
}

export default Demo;
