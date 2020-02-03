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
import React from 'react';
import { inject, observer } from 'mobx-react';
import { runInAction } from 'mobx';

import { buildNarrative, buildMapSettings } from '../FakeNarrativeBuilder';
import GeoLayers from '../containers/GeoLayers';
import Balloon from '../containers/Balloon';
import Wrapper from './Wrapper';
import AdminInterface from '../templates/AdminInterface/AdminInterface';
import TooltipOverlay from '../components/Tooltip/TooltipOverlay';
import { ModalPortalContainer } from '../components/ModalPortalWrapper';

const description = {
  description: 'Admin interface',
  author: 'Anyone',
  title: 'Admin interface',
  url: 'admin'
};

const mapSettings = buildMapSettings({
  zoom_min: 1, zoom_max: 7.5
});

@inject('store')
@observer
class SummerAdmin extends React.Component {
  constructor(props) {
    super(props);

    // Create a fake course
    const admin = buildNarrative({
      start_year: -4713, end_year: new Date().getUTCFullYear(), mapSettings, ...description
    });

    // clean data from previous selected narrative
    this.props.store.courseSelection.cleanup();
    runInAction(() => {
      this.props.store.flags.set({ layer: { cities: false } });
      this.props.store.data.narratives.data[-1] = admin;
    });
  }

  render() {
    return (
      <Wrapper story='admin' fake='0' metric='check_admin'>
        <div style={{ display: 'grid', gridTemplateColumns: '36rem auto' }}>
          <AdminInterface params={this.props.params} />
          <GeoLayers />
        </div>
        <Balloon />
        <TooltipOverlay />
        <ModalPortalContainer />
      </Wrapper>
    );
  }
}

export default SummerAdmin;
