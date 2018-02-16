/** @file Draw svg fill pattern boxes for Legend and Map
 */

import React from 'react';
import { observer } from 'mobx-react';

export const getFillPatternId = (c, name = 'fill') => `${name}_${c}`;

export const SVGPattern = ({ id, c }) => {
  const rectColor = c.slice(0, 1);
  const disputed = c.slice(1);
  return (
    <pattern
      id={id}
      width={`${disputed.length > 1 ?
        5 + (disputed.length * 2.5)
        : 5}`}
      height="5"
      patternTransform="rotate(45 0 0)"
      patternUnits="userSpaceOnUse"
    >
      <rect
        width={`${disputed.length > 1 ?
          5 + (disputed.length * 2.5)
          : 5}`}
        height="5"
        fill={rectColor}
      />
      { disputed.map((color, idx) =>
        (<line
          key={`${id}_line_${color}`}
          x1={`${5 * idx}`}
          y1="0"
          x2={`${5 * idx}`}
          y2="5"
          style={{ stroke: color, strokeWidth: 5 }}
        />))
      }
    </pattern>
  );
};

export const PatternsDefs = observer(({ bordersColors }) => {
  if (typeof bordersColors === 'undefined') return null;
  if (!(Array.isArray(bordersColors))) return null;
  const patterns = bordersColors.reduce((prev, cur) => {
    const cVls = cur.colors;
    const key = getFillPatternId(cur.id);
    const value = <SVGPattern key={key} id={key} c={cVls} />;
    return {
      ...prev,
      [key]: value
    };
  }, {});
  return (
    <g>
      {Object.keys(patterns).map(id => patterns[id])}
    </g>
  );
});

/* eslint-disable react/no-array-index-key */
// It's a static data it would not be changed
export const MapPicsDefs = observer(({ symbols }) => ( // SymbolsDefs
  <g className="symbolsDefs">
    {Object.values(symbols).map(mapPic => (
      <symbol id={`mapPic_${mapPic.id}`} key={`mapPic_key_${mapPic.id}`}>
        {mapPic.g.map((g, idx) => (
          <path
            key={`mapPic_g_key_${mapPic.id}_${idx}`}
            d={g.d}
            style={g.style}
          />))}
      </symbol>
    ))}
  </g>
));
