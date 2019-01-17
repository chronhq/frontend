/*
 * Chron.
 * Copyright (c) 2018 Alisa Belyaeva, Ata Ali Kilicli, Amaury Martiny,
 * Daniil Mordasov, Liam O’Flynn, Mikhail Orlov.
 * -----
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * -----
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * -----
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
import React from 'react';
import ReactDOM from 'react-dom';

import './style.less';

import StoreModel from './models';
import App from './App';

window.store = new StoreModel();
window.store.data.Courses.get();
window.store.courseSelection.loadBaseData();

const domain = window.location.hostname;

// use russian language only for visits on maps.chronist.ru
// it is safer than rely on browser language
if (domain === 'maps.chronist.ru') {
  window.store.i18n.select('ru');
}

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
