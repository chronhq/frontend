import React from 'react';
import { getColorFn } from '../reducers/actions';

const colorFn = getColorFn();

export const getFillColorsId = (properties) => {
  if (properties.disputed !== '') {
    const arr = properties.disputed.split(/;/)
    return [arr.shift(), arr];
  }
  return [properties.mapcolor13, []];
};
export const getFillColorsValue = colors =>
  [colorFn(colors[0]), colors[1].map(colorId => colorFn(colorId))];

export const getFillColors = (prop) => {
  const ids = getFillColorsId(prop);
  const vals = getFillColorsValue(ids);
  return [ids, vals];
}
export const getFillPatternId = (c, name = 'fill') => `${name}_${c[0]}_${c[1].join('_')}`;

export const getPatternId = (cur, name = 'fill') => getFillPatternId(getFillColorsId(cur.properties), name);

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

const PatternsDefs = ({ bordersData }) => {
  if (typeof bordersData === 'undefined') return null;
  if (!(Array.isArray(bordersData.features))) return null;
  const patterns = bordersData.features.reduce(
    (prev, cur) => {
      const [cIds, cVls] = getFillColors(cur.properties);
      const key = getFillPatternId(cIds);
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
