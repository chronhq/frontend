export function getColorFn() {
  const colors = {
    1: '#ffffcc',
    2: '#edf8e9',
    3: '#bae4b3',
    4: '#006d2c',
    5: '#bdd7e7',
    6: '#111111',
    7: '#6baed6',
    8: '#08519c',
    9: '#fbb4b9',
    10: '#9e9ac8',
    11: '#8c96c6',
    12: '#41ab5d',
    13: '#fcae91',
    14: '#111111',
    15: '#fb6a4a',
    16: '#111111',
    17: '#756bb1',
    18: '#d7b5d8',
    19: '#d7b5d8',
    20: '#253494',
    21: '#fe9929',
    22: '#993404'
  };
  return num => colors[num];
}
const colorFn = getColorFn();

/** @function getFillColorsId
 * @description Parse disputed field and grouped colors.
 * @returns [mainColorId, [disputedColorId2, disputedColorId3, ...]]
*/
export const getFillColorsId = (properties, colorsData) => {
  if (properties.disputed !== '') {
    const arr = properties.disputed.split(/;/);
    return [arr.shift(), arr];
  }
  return colorsData.enabled === true
    ? [colorsData.colors[properties.admin.id], []]
    : [properties.mapcolor13, []];
};

/** @function getFillColorsValue
 * @description ColorId to html color HEX value
 * @param {array} Array of color ids [mainColorId, [dsCid2, dsCid3, ...]]
 * @returns [mainColorHex, [disputedColorHex2, disputedColorHex3, ...]]
 */
const getFillColorsValue = colors =>
  [colorFn(colors[0]), colors[1].map(colorId => colorFn(colorId))];

export const getFillColors = (prop, colorsData) => {
  const ids = getFillColorsId(prop, colorsData);
  const vals = getFillColorsValue(ids);
  return [ids, vals];
};