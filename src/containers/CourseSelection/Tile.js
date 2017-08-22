import React from 'react';

const Tile = ({ course, disabled, selectCourse, selected }) => {
  const className = selected ? 'courseTileSelected' : 'courseTileRegular';
  return (
    <div className={className} >
      <button
        disabled={disabled}
        onClick={() => selectCourse(course.id)}
      >{selected && 'SELECTED'}{course.name}</button>
    </div>
  );
};

export default Tile;
