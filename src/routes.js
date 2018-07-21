import React from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import { observer, inject } from 'mobx-react';

import ShowCourse from './ShowCourse';
import CourseSelection from './containers/CourseSelection';
import NotFound from './components/ErrorPages/404';
import BadGateway from './components/ErrorPages/502';
import GatewayTimeout from './components/ErrorPages/504';

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
          <Route exact path='/404' component={NotFound} />
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
