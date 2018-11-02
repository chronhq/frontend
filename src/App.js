import React from 'react';
import { Provider, observer } from 'mobx-react';
import { BrowserRouter as Router } from 'react-router-dom';
import { YMInitializer } from 'react-yandex-metrika';

import AppRouter from './routes';

const YM_CONFIG = {
  defer: false,
  clickmap: true,
  trackLinks: true,
  // accurateTrackBounce: true,
  // webvisor: true,
  trackHash: false
};

@observer
class App extends React.Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <Router>
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
