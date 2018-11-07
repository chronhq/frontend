import React, { Suspense, lazy } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import { observer, inject } from 'mobx-react';

import Spinner from './components/Spinner/Spinner';

import ShowCourse from './ShowCourse';
import CourseSelection from './pages/CourseSelection';
// const NotFound = lazy(() => import('./pages/404'));
// const BadGateway = lazy(() => import('./pages/502'));
// const GatewayTimeout = lazy(() => import('./pages/504'));

import NotFound from './pages/404';
import BadGateway from './pages/502';
import GatewayTimeout from './pages/504';

// const SuspenseWrapper = (component) => {
//   const Component = component;
//   return (
//     <Suspense fallback={<Spinner />}>
//       <Component />
//     </Suspense>
//   );
// }

@inject('store')
@observer
class RouteWrapper extends React.Component {
  render() {
    const Component = this.props.component;
    return (<Component {...this.props} component='' />);
  }
}

class AppRouter extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <RouteWrapper exact path='/' component={CourseSelection} />
            <Route path='/404' component={NotFound} />
            <Route path='/502' component={BadGateway} />
            <Route path='/504' component={GatewayTimeout} />
          <RouteWrapper path='/:id' component={ShowCourse} />
          <Route render={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default AppRouter;
