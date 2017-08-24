import React from 'react';

const Tile = ({ course, disabled, selectCourse, selected }) => {
  // const className = selected ? 'courseTileSelected' : 'courseTileRegular';
  /* eslint-disable jsx-a11y/no-static-element-interactions */
  return (
    <div className='startpage__tile' onClick={disabled ? () => true : () => selectCourse(course.id)} >
      <h3> {course.name} </h3>
      <i className="fa fa-globe fa-5x tile__icon" aria-hidden="true" />
      <p className='tile__description'>{course.description}</p>
    </div>
  );
};

export default Tile;
