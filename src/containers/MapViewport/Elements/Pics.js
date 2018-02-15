import React from 'react';
import { observer, inject } from 'mobx-react';
import { computed } from 'mobx';


const SymbolsDefs = ({ symbols }) => ( // MapPics
  <g className="symbolsDefs">
    {symbols.map(mapPic => (
      <symbol id={`mapPic_${mapPic.id}`} key={`mapPic_key_${mapPic.id}`}>
        {mapPic.g.map((g, id) => (
          <path
            key={`mapPic_g_key_${mapPic.id}_${id}`}
            d={g.d}
            style={g.style}
          />))}
      </symbol>
    ))}
  </g>
);

export default SymbolsDefs;
