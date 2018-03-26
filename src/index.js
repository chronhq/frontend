import React from 'react';
import ReactDOM from 'react-dom';

// import external styles
import './LineIcon.less'
import 'font-awesome/less/font-awesome.less';
import 'bootstrap/less/bootstrap.less';

import StoreModel from './models';
import App from './App';

window.store = new StoreModel();
window.store.data.Courses.get();

function renderApp(component) {
  const Application = component;
  ReactDOM.render(<Application store={window.store} />, document.getElementById('root'));
}

renderApp(App);

if (module.hot) {
  // new components
  module.hot.accept(['./App'], () => {
    // eslint-disable-next-line global-require
    const NextApp = require('./App').default;
    renderApp(NextApp);
  });
}
