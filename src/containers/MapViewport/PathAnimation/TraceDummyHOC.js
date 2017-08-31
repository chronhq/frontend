import React from 'react';
import PathAnimation from './PathAnimation';

const points = [
  [400, 200],
  [580, 200]
];


const TraceDummyHOC = () => (
  <svg>
    <PathAnimation points={points} />
  </svg>
);


export default TraceDummyHOC;
