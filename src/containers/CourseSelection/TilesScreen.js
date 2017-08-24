import React from 'react';

import Tile from './Tile';
import './TilesScreen.less';

const TilesScreen = ({ courses, loading, selected, selectCourse }) => (
  <div className='startpage__container'>
    <h2 className='starpage__title'> Выберите Режим </h2>
    <div className='tile__container'>
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
  </div>
);

export default TilesScreen;
