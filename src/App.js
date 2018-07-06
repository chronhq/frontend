import React from 'react';
import { Provider, observer } from 'mobx-react';
import { BrowserRouter as Router, hashHistory } from 'react-router-dom';
import { YMInitializer } from 'react-yandex-metrika';

// import './style.less';

import { YmId } from './metrikaHelper';

import AppRouter from './routes';

@observer
class App extends React.Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <Router history={hashHistory}>
          <YMInitializer
            accounts={YmId}
            version="2"
            options={{
              defer: true,
              clickmap: true,
              trackLinks: true,
              // accurateTrackBounce: true,
              // webvisor: true,
              // trackHash: true,
            }}
          >
            <AppRouter />
          </YMInitializer>
        </Router>
      </Provider>
    );
  }
}

export default App;
