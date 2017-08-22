import React from 'react';

import Tile from './Tile';
import './CourseSelection.less';

const TilesScreen = ({ courses, loading, selected, selectCourse }) => (
  <div>
    {Object.keys(courses).map(c => (
      <Tile
        key={`courseSelector_id${c}`}
        course={courses[c]}
        disabled={loading}
        selected={selected === courses[c].id}
        selectCourse={id => selectCourse(id)}
      />
    ))
    }
  </div>
);

export default TilesScreen;
