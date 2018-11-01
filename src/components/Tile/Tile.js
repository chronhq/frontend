import React from 'react';
import { Link } from 'react-router-dom';

import './Tile.less';

function isOdd(n) {
  return Math.abs(n % 2) === 1;
}

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
const Tile = ({ course, lng }) => (
  <div className={isOdd(course.id) ? 'tile odd' : 'tile'}>
  {/*
  <div className='tile-wrapper'>
*/}
    <div className='tile-left' />
    <div className='tile-center'>
      <Link to={`${course.url}`}>
        <div className='tile__content'>
          <h3 className='tile__title'>
            {' '}
            {course.name[lng]}
            {' '}
          </h3>
          <p className='tile__description'>
            {course.description[lng]}
          </p>
        </div>
      </Link>
    </div>
    <div className='tile-right' />
  </div>
);

export default Tile;
