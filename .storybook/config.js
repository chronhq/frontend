import React from 'react'
import { configure } from '@storybook/react';

import '../src/style.less';
// function loadStories() {
//   require('../stories/index.js');
//   // You can require as many stories as you need.
// }

const req = require.context('components', true, /.stories.js$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module);
