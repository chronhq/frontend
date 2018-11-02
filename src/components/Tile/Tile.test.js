import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';

import Tile from './Tile';

// current
const course = {
  url: {
    ru: 'урл',
    en: 'url'
  },
  name: {
    ru: 'name',
    en: 'name'
  },
  description: {
    ru: 'desc',
    en: 'desc'
  },
};

// proposed
const data = {
  ru: {
    course: {
      url: 'url',
      name: 'name',
      description: 'desc'
    },
    settings: {},
  },
  en: {
    course: {},
    settings: {},
    intro: {}
  }
};

const TestComponent = () => (
  <Router>
    <Tile course={course} lng='ru' />
  </Router>
);


// it must render
it('Tile render without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TestComponent />, div);
});

// Snapshot tests
it('Tile Snapshot', () => {
  const tree = renderer
    .create(<TestComponent />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
