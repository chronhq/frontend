/** @file Draw svg fill pattern boxes for Legend and Map
 */
import React from 'react';

/* eslint-disable react/no-array-index-key */
// It's a static data it would not be changed
const MapPicsDefs = ({ symbols }) => ( // SymbolsDefs
  <g className="symbolsDefs">
    {Object.values(symbols).map(mapPic => (
      <symbol
        id={`mapPic_${mapPic.id}`}
        key={`mapPic_key_${mapPic.id}`}
        viewBox={mapPic.viewbox}
      >
        {mapPic.g.map((g, idx) => (
          <path
            key={`mapPic_g_key_${mapPic.id}_${idx}`}
            d={g.d}
            style={{ ...g.style }}
          />))}
      </symbol>
    ))}
  </g>
);


class Defs extends React.Component {
  render() {
    return (
      <defs>
        <MapPicsDefs symbols={this.props.MapPics.data} />
      </defs>
    );
  }
}

export default Defs;
