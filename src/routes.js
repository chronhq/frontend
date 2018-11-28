import React, { Suspense, lazy } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';

import LoadingLogo from './containers/LoadingScreen/LoadingLogo';

const ShowCourse = lazy(() => import('./ShowCourse'));
const CourseSelection = lazy(() => import('./pages/CourseSelection'));
const NotFound = lazy(() => import('./pages/404'));
const BadGateway = lazy(() => import('./pages/502'));
const GatewayTimeout = lazy(() => import('./pages/504'));
const World = lazy(() => import('./pages/World'));
const Narrative = lazy(() => import('./pages/Narrative'));

const AppRouter = () => (
  <Suspense fallback={<LoadingLogo />}>
    <Switch>
      <Route exact path='/' render={() => <CourseSelection />} />
      <Route path='/404' render={() => <NotFound />} />
      <Route path='/502' render={() => <BadGateway />} />
      <Route path='/504' render={() => <GatewayTimeout />} />
      <Route path='/newworld' render={() => <World />} />
      <Route path='/narrative/:id' render={({ match }) => <Narrative match={match} />} />
      <Route path='/:id' render={({ match }) => <ShowCourse match={match} />} />
    </Switch>
  </Suspense>
);

export default AppRouter;
