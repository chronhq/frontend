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
import LoginScreen from './LoginScreen';
import AdminPanel from './AdminPanel';
import DummyScreen from './DummyScreen';

import './AdminScreen.less';
import AdminTE from './AdminTE';
import AdminSTV from './AdminSTV';
import EditSTV from './EditSTV';
import EditPRS from './EditPRS';

const Grid = ({ children }) => (
  <div className='admin-grid-container'>
    {children}
  </div>
);

const GridPanel = ({ position, children }) => (
  <div style={{ gridArea: position }} className='admin-grid-panel'>
    {children}
  </div>
);

const GridLoginScreen = () => (<Grid><GridPanel position='left'><LoginScreen /></GridPanel></Grid>);

const GridTE = () => (
  <Grid>
    <GridPanel position='left'>
      <AdminTE />
      <EditPRS />
    </GridPanel>
    <GridPanel position='right'>
      <AdminSTV />
      <EditSTV />
    </GridPanel>
  </Grid>
);

const GridWIP = () => (
  <Grid>
    <GridPanel position='left'>
      <AdminPanel />
      <DummyScreen />
    </GridPanel>
  </Grid>
);

const GridAdminPanel = () => (
  <Grid>
    <GridPanel position='left'>
      <AdminPanel />
    </GridPanel>
  </Grid>
);

export {
  GridAdminPanel,
  GridWIP,
  GridTE,
  GridLoginScreen,
};
