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
import './styles/LineIcon.less';

import StoreModel from './models';
import App from './App';

window.store = new StoreModel();
window.store.data.narratives.get();
window.store.courseSelection.loadBaseData();

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
