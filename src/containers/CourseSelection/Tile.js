import React from 'react';
import {
  Link,
} from 'react-router-dom';

const Tile = ({ course, disabled, selectCourse }) => {
  // const className = selected ? 'courseTileSelected' : 'courseTileRegular';
  /* eslint-disable jsx-a11y/no-static-element-interactions */
  return (
    <div className='startpage__tile child' >
      {/* 
      <div className='tile__icon'>
        <i className="fa fa-globe fa-3x" aria-hidden="true" />
      </div>
      */}
      <Link to={`${course.url}`}>
        <div className='tile__content'>
          <h3 className='tile__title'> {course.name} </h3>
          {/* <div className='tile__content__separator' /> */}
          <p className='tile__description'>{course.description}</p>
        </div>
      </Link>
    </div>
  );
};

export default Tile;
