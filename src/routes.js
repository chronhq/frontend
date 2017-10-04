import React from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
// import { connect } from 'react-redux';
import { Flag } from 'flag';

import App from './App';
// import NotFound from './'
// import StartPage from './components/StartPage';
import CourseSelection from './containers/CourseSelection';
// import CourseSelection from './containers/CourseSelection';
import DevTools from './DevTools';
import UI from './containers/UI';

const AppSelect = () => (
  <div>
    <Flag
      name="CourseSelection"
      // render={() => <RouterMiddleware id={match.params.id} />}
      render={() => <CourseSelection />}
      fallbackRender={() => <UI />}
    />
    <Flag
      name="devTools"
      render={() => <DevTools />}
    />
  </div>
);

const NotFound = () => (
  <div>
    <h3> Not Found </h3>
  </div>
);

// const Test = ({ match }) => {
//   console.log(match);
//   return(
//     <div>
//       <h3> Test {match.params.id}</h3>
//     </div>
//   );
// };

const AppRouter = () => (
  <Switch>
    <Route exact path='/' component={AppSelect} />
    <Route exact path='/404' component={NotFound} />
    <Route path='/:id' component={App} />
    <Route render={NotFound} />
  </Switch>
);

// class AppRouter extends AnotherClass {
//   constructor(props) {
//     super(props);
//   }

//   // methods
// }

export default AppRouter;
