// const colorFn = color => `#${color}`;

/** @function getFillColorsId
 * @description Parse disputed field and grouped colors.
 * @returns [mainColorId, [disputedColorId2, disputedColorId3, ...]]
*/
export const getFillColorsId = (properties, colorsData) => {
  if (properties.disputed !== '') {
    const arr = properties.disputed.split(/;/);
    return arr;
  }
  return colorsData.enabled === true
    ? [colorsData.colors[properties.admin.id]]
    : [properties.color];
};

/** @function getFillColorsValue
 * @description ColorId to html color HEX value
 * @param {array} Array of color ids [mainColorId, [dsCid2, dsCid3, ...]]
 * @returns [mainColorHex, [disputedColorHex2, disputedColorHex3, ...]]
 */
// const getFillColorsValue = colors =>
//   [colorFn(colors[0]), colors[1].map(colorId => colorFn(colorId))];

export const getFillColors = (prop, colorsData) => {
  const colors = getFillColorsId(prop, colorsData);
  // const vals = getFillColorsValue(ids);
  return colors;
};
