import React from 'react';
import ReactDOM from 'react-dom';

import './style.less';
import './LineIcon.less';
import './img/favicon.ico';
import './img/richpreview.jpg';

import StoreModel from './models';
import App from './App';

window.store = new StoreModel();
window.store.data.Courses.get();
window.store.effects.course.loadBaseData();
window.store.effects.course.loadContourInfo();

if ('fonts' in document) {
  document.fonts.onloadingdone = (fontFaceSetEvent) => {
    fontFaceSetEvent.fontfaces.map((f) => {
      window.store.fonts = {
        ...window.store.fonts,
        [f.family]: f,
      };
      return null;
    });
  };
} else {
  // Edge browser
  console.log('Fallback fonts loading');
  const w8 = 10000; // 10 sec
  setTimeout(() => {
    Object.keys(window.store.prepared.decor.mapLabels.fonts).map((f) => {
      window.store.fonts[f] = f;
      return null;
    });
  }, w8);
}


function renderApp(component) {
  const Application = component;
  ReactDOM.render(
    <Application store={window.store} />,
    document.body.appendChild(document.createElement('div')));
}

renderApp(App);

if (module.hot) {
  module.hot.accept(['./App'], () => {
    // eslint-disable-next-line global-require
    const NextApp = require('./App').default;
    renderApp(NextApp);
  });
}
