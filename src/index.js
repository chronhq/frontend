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

// https://stackoverflow.com/questions/7944460/detect-safari-browser
const isSafari = navigator.vendor
  && navigator.vendor.indexOf('Apple') > -1
  && navigator.userAgent
  && navigator.userAgent.indexOf('CriOS') === -1
  && navigator.userAgent.indexOf('FxiOS') === -1;

if ('fonts' in document && !isSafari) {
  document.fonts.onloadingdone = (fontFaceSetEvent) => {
    fontFaceSetEvent.fontfaces.map((f) => {
      window.store.fonts = {
        ...window.store.fonts,
        [f.family]: f,
      };
      return null;
    });
  };
} else { // kludge for toponyms
  // Edge browser and Safari
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
    document.body.appendChild(document.createElement('div'))
  );
}

renderApp(App);

if (module.hot) {
  module.hot.accept(['./App'], () => {
    const script = [];
    while (document.body.firstChild) {
      const s = document.body.removeChild(document.body.firstChild);
      if (s.type === 'text/javascript') script.push(s);
    }
    script.map(s => document.body.appendChild(s));
    // eslint-disable-next-line global-require
    const NextApp = require('./App').default;
    renderApp(NextApp);
  });
}
