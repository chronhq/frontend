import React from 'react';

export const getFillColors = properties => (properties.disputed !== ''
        ? properties.disputed.split(/;/)
        : [properties.mapcolor13, properties.mapcolor13]);
export const getFillPatternId = (c1, c2) => `fill_${c1}_${c2}`;
export const getPatternId = cur => getFillPatternId(...getFillColors(cur.properties));

export const SVGPattern = ({ id, c1, c2 }) => (
  <pattern
    id={id}
    width="5"
    height="5"
    patternTransform="rotate(45 0 0)"
    patternUnits="userSpaceOnUse"
  >
    <rect
      width="5"
      height="5"
      fill={c2}
    />
    { c1 !== c2 && // Do not spawn additional line with same color as rect
      <line
        x1="0" y1="0" x2="0" y2="5"
        style={{ stroke: c1, strokeWidth: 5 }}
      />
    }
  </pattern>
);

const PatternsDefs = ({ bordersData, color }) => {
  if (typeof bordersData === 'undefined') return null;
  if (!(Array.isArray(bordersData.features))) return null;
  const patterns = bordersData.features.reduce(
    (prev, cur) => {
      const [c1, c2] = getFillColors(cur.properties);
      const key = getFillPatternId(c1, c2);
      const value = <SVGPattern key={key} id={key} c1={color(c1)} c2={color(c2)} />;
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
