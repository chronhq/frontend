/** @file Draw svg fill pattern boxes for Legend and Map
 */

import React from 'react';

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
        />)
      )}
    </pattern>
  );
}

const PatternsDefs = ({ bordersData, colorsData }) => {
  if (typeof bordersData === 'undefined') return null;
  if (!(Array.isArray(bordersData))) return null;
  const patterns = bordersData.reduce(
    (prev, cur) => {
      const cVls = cur.colors[colorsData.name];
      const key = getFillPatternId(cur.id);
      const value = <SVGPattern key={key} id={key} c={cVls} />;
      return { ...prev,
        [key]: value
      };
    }, {});
  return (
    <g>
      {Object.keys(patterns).map(id => patterns[id])}
    </g>
  );
};

export default PatternsDefs;
