import React from 'react';

const Tile = ({ course, disabled, selectCourse, selected }) => {
  // const className = selected ? 'courseTileSelected' : 'courseTileRegular';
  /* eslint-disable jsx-a11y/no-static-element-interactions */
  return (
    <div className='startpage__tile child' onClick={disabled ? () => true : () => selectCourse(course.id)} >
      {/* 
      <div className='tile__icon'>
        <i className="fa fa-globe fa-3x" aria-hidden="true" />
      </div>
      */}
      <div className='tile__content'>
        <h3 className='tile__title'> {course.name} </h3>
        {/* <div className='tile__content__separator' /> */}
        <p className='tile__description'>{course.description}</p>
      </div>
    </div>
  );
};

export default Tile;
