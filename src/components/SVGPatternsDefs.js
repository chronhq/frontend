/** @file Draw svg fill pattern boxes for Legend and Map
 */

import React from 'react';

export const getFillPatternId = (c, name = 'fill') => `${name}_${c}`;

export const SVGPattern = ({ id, c }) => (
  <pattern
    id={id}
    width={`${c[1].length > 1 ?
      5 + (c[1].length * 2.5)
      : 5}`}
    height="5"
    patternTransform="rotate(45 0 0)"
    patternUnits="userSpaceOnUse"
  >
    <rect
      width={`${c[1].length > 1 ?
      5 + (c[1].length * 2.5)
      : 5}`}
      height="5"
      fill={c[0]}
    />
    { c[1].map((color, idx) =>
      <line
        key={`${id}_line_${color}`}
        x1={`${5 * idx}`} y1="0" x2={`${5 * idx}`} y2="5"
        style={{ stroke: color, strokeWidth: 5 }}
      />
    )}
  </pattern>
);

const PatternsDefs = ({ bordersData, colorsData }) => {
  if (typeof bordersData === 'undefined') return null;
  if (!(Array.isArray(bordersData))) return null;
  const patterns = bordersData.reduce(
    (prev, cur) => {
      const [cIds, cVls] = cur.colors[colorsData.name];
      const key = getFillPatternId(cur.id);
      const value = <SVGPattern key={key} id={key} c={cVls} />;
      return { ...prev,
        [key]: value
      };
    }, {});
  return (
    <defs>
      {Object.keys(patterns).map(id => patterns[id])}
    </defs>
  );
};

export default PatternsDefs;
