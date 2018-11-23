import React, { Suspense, lazy } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';

import Spinner from './components/Spinner/Spinner';
const ShowCourse = lazy(() => import('./ShowCourse'));
const CourseSelection = lazy(() => import('./pages/CourseSelection'));
const NotFound = lazy(() => import('./pages/404'));
const BadGateway = lazy(() => import('./pages/502'));
const GatewayTimeout = lazy(() => import('./pages/504'));
// const World = lazy(() => import('./pages/World'));
// const Narrative = lazy(() => import('./pages/Narrative'));

const AppRouter = () => (
  <div>
    <Suspense fallback={<Spinner />}>
      <Switch>
        <Route exact path='/' render={() => <CourseSelection />} />
        <Route path='/404' render={() => <NotFound />} />
        <Route path='/502' render={() => <BadGateway />} />
        <Route path='/504' render={() => <GatewayTimeout />} />
        <Route path='/:id' render={({ match }) => <ShowCourse match={match} />} />
        {/*
          <RouteWrapper path='/:id' component={ShowCourse} />
          <Route path='/narrative' component={<Narrative />} />
          <Route path='/newworld' component={<World />} />
        */}
      </Switch>
    </Suspense>
  </div>
);

export default AppRouter;
