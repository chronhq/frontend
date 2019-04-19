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

import Overlays from '../templates/Overlays/Overlays';
import GeoLayers from '../containers/GeoLayers';
import Balloon from '../containers/Balloon';
import Dashboard from '../templates/Dashboard/Dashboard';
import SideBar from '../templates/SideBar/SideBar';
import NarrativeMobileBar from '../templates/NarrativeMobileBar/NarrativeMobileBar';
import Wrapper from './Wrapper';
import AdminOverlay from '../containers/AdminOverlay/AdminOverlay';

const Narrative = ({ story, fake, metric }) => (
  <Wrapper story={story} fake={fake} metric={metric}>
    <GeoLayers />
    <Balloon />
    <Dashboard />
    <NarrativeMobileBar />
    <Overlays />
    <SideBar />
    <AdminOverlay />
  </Wrapper>
);

export default Narrative;
