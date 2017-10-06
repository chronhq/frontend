import React, { Component } from 'react';
import 'bootstrap/less/bootstrap.less';

import { Flag } from 'flag';

// import CourseSelection from './containers/CourseSelection';
import RouterMiddleware from './containers/CourseSelection/RouterMiddleware';
import UI from './containers/UI';

import DevTools from './DevTools';
import './App.less';

// class App extends Component {
//   render() {
//     return (
//       <div>
//         <Flag
//           name="CourseSelection"
//           render={() => <RouterMiddleware id={this.props.params.id} />}
//           // render={() => <CourseSelection />}
//           fallbackRender={() => <UI />}
//         />
//         <Flag
//           name="devTools"
//           render={() => <DevTools />}
//         />
//       </div>
//     );
//   }
// }


const App = ({ match }) => (
  <div>
    <Flag
      name="CourseSelection"
      render={() => <RouterMiddleware id={match.params.id} />}
      // render={() => <CourseSelection />}
      fallbackRender={() => <UI />}
    />
    <Flag
      name="devTools"
      render={() => <DevTools />}
    />
  </div>
);

export default App;
