import React from 'react';
import ReactDOM from 'react-dom';

import './style.less';
import './LineIcon.less';

import StoreModel from './models';
import App from './App';

window.store = new StoreModel();
window.store.data.Courses.get();
window.store.effects.course.loadBaseData();
window.store.effects.course.loadContourInfo();

function renderApp(component) {
  const Application = component;
  ReactDOM.render(<Application store={window.store} />, document.getElementById('root'));
}

renderApp(App);

if (module.hot) {
  module.hot.accept(['./App'], () => {
    // eslint-disable-next-line global-require
    const NextApp = require('./App').default;
    renderApp(NextApp);
  });
}
