import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';

import Tile from './Tile';

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
