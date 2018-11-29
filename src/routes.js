import React, { Suspense, lazy } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';

import LoadingLogo from './containers/LoadingLogo';

const NotFound = lazy(() => import('./pages/404'));
const BadGateway = lazy(() => import('./pages/502'));
const GatewayTimeout = lazy(() => import('./pages/504'));
const CourseSelection = lazy(() => import('./pages/CourseSelection'));
const World = lazy(() => import('./pages/World'));
const Narrative = lazy(() => import('./pages/Narrative'));

const AppRouter = () => (
  <Suspense fallback={<LoadingLogo />}>
    <Switch>
      <Route exact path='/' render={() => <CourseSelection />} />
      <Route path='/404' render={() => <NotFound />} />
      <Route path='/502' render={() => <BadGateway />} />
      <Route path='/504' render={() => <GatewayTimeout />} />
      <Route path='/world' render={() => <World />} />
      <Route path='/:id' render={({ match }) => <Narrative story={match.params.id} />} />
    </Switch>
  </Suspense>
);

export default AppRouter;
