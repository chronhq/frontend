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
import LoginScreen from '../../containers/AdminOverlay/LoginScreen';
import AdminPanel from '../../containers/AdminOverlay/AdminPanel';
import DummyScreen from '../../containers/AdminOverlay/DummyScreen';

import AdminTE from '../../containers/AdminOverlay/AdminTE';
import AdminSTV from '../../containers/AdminSTV/AdminSTV';
import EditPRS from '../../containers/AdminOverlay/EditPRS';

import AdminBlock from './AdminBlock';

const Login = () => (<AdminBlock position='left'><LoginScreen /></AdminBlock>);

const TE = () => (
  <>
    <AdminBlock position='left'>
      <AdminTE />
      <EditPRS />
    </AdminBlock>
    <AdminBlock position='right'>
      <AdminSTV />
    </AdminBlock>
  </>
);

const WIP = () => (
  <>
    <AdminBlock position='left'>
      <AdminPanel />
      <DummyScreen />
    </AdminBlock>
  </>
);

const Panel = () => (
  <>
    <AdminBlock position='left'>
      <AdminPanel />
    </AdminBlock>
  </>
);

export {
  Panel,
  WIP,
  TE,
  Login,
};
