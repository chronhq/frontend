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
import React, { Suspense, lazy } from 'react';
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import LoadingLogo from './containers/LoadingLogo';
import AnalyticsWrapper from './containers/Analytics/AnalyticsWrapper';

const Story = lazy(() => import('./pages/SummerStory'));

const Admin = lazy(() => import('./pages/SummerAdmin'));
const NotFound = lazy(() => import('./pages/404'));
const BadGateway = lazy(() => import('./pages/502'));
const GatewayTimeout = lazy(() => import('./pages/504'));
const About = lazy(() => import('./pages/About'));

const AppRouter = () => (
  <Suspense fallback={<LoadingLogo />}>
    <AnalyticsWrapper />
    <Switch>
      <Route exact path='/' render={() => <Redirect to='/world' />} />
      <Route path='/404' render={() => <NotFound />} />
      <Route path='/504' render={() => <GatewayTimeout />} />
      <Route path='/502' render={() => <BadGateway />} />
      <Route path='/404' render={() => <NotFound />} />
      <Route path='/about' render={() => <About />} />
      <Route
        path='/admin/:type?/:entity?/:sub?'
        render={({ match }) => <Admin params={match.params} />}
      />
      <Route path='/:id' render={({ match }) => <Story story={match.params.id} />} />
    </Switch>
  </Suspense>
);

export default AppRouter;
