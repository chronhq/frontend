import React from 'react';
// import { geoMercator, geoPath, projection } from 'd3-geo';
// import { json } from 'd3-request';
// import { select } from 'd3-selection';

import Tile from './Tile';
import './TilesScreen.less';

const TilesScreen = ({ courses }) => (
  <div className='startpage__container parent'>
    <div className='starpage__title'>
      <h3> Выберите Режим </h3>
    </div>
    <div className='tile__container'>
      <div className='hex-row'>
        {Object.keys(courses).map(c => (
          <Tile
            key={`courseSelector_id${c}`}
            course={courses[c]}
          />
        ))
        }
      </div>
    </div>
  </div>
);

export default TilesScreen;
