import React from 'react';
import { observer, inject } from 'mobx-react';
import { computed } from 'mobx';

//     mapLabels: Object.values(state.data.mapLabels.byId),
const MapLabels = ({ labels }) => (
  <g className="mapLabels">
    {labels.map(text => (
      <text
        key={`mapLabel_key_${text.id}`}
        className={`mapLabels ${text.style}`}
        transform={`translate(${text.projected.x},${text.projected.y})`}
      >
        {text.string}
      </text>))
    }
  </g>
);

export default MapLabels;
