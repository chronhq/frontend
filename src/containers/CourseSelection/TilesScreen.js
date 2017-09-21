import React from 'react';
import { geoMercator, geoPath, projection } from 'd3-geo';
import { json } from 'd3-request';
import { select } from 'd3-selection';

import Tile from './Tile';
import './TilesScreen.less';

class WorldMap extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.renderMap();
  }

  renderMap() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    // const svg = select('body').append('svg');
    this.container = select(this.container);
    // const svg = this.container
    const projection = geoMercator();
    // // .scale(width / 2 / Math.PI)
    // //.scale(100)
    // .translate([width / 2, height / 2]);
    const path = geoPath()
      .projection(projection);
      // .style('stroke', '#418CAB')
      // .style('stroke-width', '0.5px')
      // .style('fill', '#335A7B')

    const url = 'http://enjalot.github.io/wwsd/data/world/world-110m.geojson';
  
    // json(url, function(err, geojson) {
    //   this.container.append('path')
    //     .attr('d', path(geojson));
    // });
  }

  render() {
    return(
      <svg
        width={window.innerWidth}
        height={window.innerHeight}
        ref={(r) => { this.container = r; }}
      ></svg>
    );
  }
}


const TilesScreen = ({ courses, loading, selected, selectCourse }) => (
  <div className='startpage__container parent'>
    
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
