import React from 'react';
import { observer, inject } from 'mobx-react';
import { computed } from 'mobx';

//     mapDecorations: Object.values(state.data.mapDecorations.byId),

const MapDecorations = ({ decorations }) => (
  <g className="mapDecorations">
    {decorations.map(icon => (<use
      key={`mapPic_key_${icon.id}_${icon.picId}`}
      xlinkHref={`#mapPic_${icon.picId}`}
      transform={`translate(${icon.projected.x},${icon.projected.y}) ${icon.transform}`}
    />))
    }
  </g>
);

export default MapDecorations;
