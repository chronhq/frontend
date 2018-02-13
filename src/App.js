import React from 'react';
import { Provider, observer } from 'mobx-react';
import { BrowserRouter as Router, hashHistory } from 'react-router-dom';
import { YMInitializer } from 'react-yandex-metrika';

import AppRouter from './routes';

// Yandex Metrika id
const YmId = (process.env.NODE_ENV === 'production') ? [42857239, 42866674] : [42866674];
// ym.init([42857239]); <- Alice id
// ym.init([42866674]); <- Padavan id


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
