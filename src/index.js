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

document.fonts.onloadingdone = (fontFaceSetEvent) => {
  fontFaceSetEvent.fontfaces.map((f) => {
    window.store.fonts = {
      ...window.store.fonts,
      [f.family]: f,
    };
    return null;
  });
};


function resize() {
  window.store.deck.setSize(window.innerWidth, window.innerHeight);
}

function renderApp(component) {
  const Application = component;
  ReactDOM.render(<Application store={window.store} />, document.getElementById('root'));
}

window.addEventListener('resize', () => resize(), false);
resize();

renderApp(App);

if (module.hot) {
  module.hot.accept(['./App'], () => {
    // eslint-disable-next-line global-require
    const NextApp = require('./App').default;
    renderApp(NextApp);
  });
}
