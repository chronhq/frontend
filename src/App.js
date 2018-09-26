import React from 'react';
import { Provider, observer } from 'mobx-react';
import { BrowserRouter as Router, hashHistory } from 'react-router-dom';
import { YMInitializer } from 'react-yandex-metrika';

import { YmId } from './metrikaHelper';

import AppRouter from './routes';

const YM_CONFIG = {
  defer: true,
  clickmap: true,
  trackLinks: true
  // accurateTrackBounce: true,
  // webvisor: true,
  // trackHash: true,
};

@observer
class App extends React.Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <Router history={hashHistory}>
          <YMInitializer
            accounts={[50501221]}
            options={YM_CONFIG}
          >
            <AppRouter />
          </YMInitializer>
        </Router>
      </Provider>
    );
  }
}

export default App;
