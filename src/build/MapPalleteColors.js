const colors = {
  bittersweet: ['#FF6161', '#ED888D', '#CC2B33', '#F25578', '#FFBBBE', '#BC5055', '#FF8564', '#EA4544', '#A51E25'], // red
  cello: ['#263F66', '#4F7EBF', '#15529B', '#4A90F4', '#83CAFF', '#1E66D8', '#ACC5EA'], // blue
  casablanca: ['#F9AA54', '#FF7F00', '#FFBB8D', '#FFC466', '#FF9A36', '#FFC043', '#E26B00'], // Orange
  gorse: ['#F9E156', '#FFE594', '#D8BA25', '#FFFF71', '#FFD400', '#FFF3B6', '#FFFA3E', '#CCFFCC'], // Yellow
  blueChill: ['#089195', '#7BD9DB', '#6EA6BA', '#817F82', '#04C6CC', '#89A0D6', '#82CFE1'], // Greenish
  highland: ['#669966', '#82BF82', '#A7D3A7', '#9ABA85', '#567A56', '#5DAF86', '#668E4D'], // Dirty green earth
  horizon: ['#5585A3', '#75D5EF', '#9DC7D1', '#76B5F4', '#CFDCFF', '#75A5BA', '#A1E0FF'], // easy blue
  sepiaSkin: ['#935A41', '#996633', '#753C1F', '#AF7E68', '#BC8757', '#B5623E', '#7C5B4D'], // brown
  bermuda: ['#80D0DD', '#37CDDD', '#4EF2ED', '#A0E8DF', '#99F5FF', '#14EFD5', '#00A397'], // Turquoise
  cannonPink: ['#944564', '#CC628E', '#FFB8D5', '#7C2C4C', '#FF80BA', '#AF3371', '#DD4B80'], // berry pink
  earlsGreen: ['#ACB537', '#BEE36F', '#C8D487', '#C5D117', '#86D117', '#AFDE4B', '#C4ED6D'], // somewhere yellow-green
  wisteria: ['#9561BA', '#C086F2', '#DEB8FF', '#A08CF4', '#922DFC', '#876ED6', '#6654AF'], // Velvet
  strikemaster: ['#A55F94', '#E283D0', '#DD50C2', '#77316A', '#FFB3F4', '#A3348E', '#75456C'], // Purple
  grey: ['#7F7F7F', '#A8A8A8', '#606060', '#7C8CA0', '#DDDDDD', '#B2BDCE', '#62738C'], // gray
};

console.log(colors);
// const INSERT='INSERT INTO api_mapcolorscheme (color, pallete, main) VALUES';
// Object.keys(colors).forEach((group) => {
//   colors[group].forEach((color, idx) => {
//     console.log(`${INSERT} ('${color}', '${group}', ${idx === 0 ? 'True' : 'False'});`);
//   });
// });

// const old = ['#ff6161', '#263f66', '#f9aa54', '#f9ff56', '#089195',
// '#669966', '#044e7b', '#935a41', '#80d0dd', '#944564', '#acb537', '#9561ba', '#a55f94'];

// const UP = 'UPDATE api_territorialentity SET color = foo.color_id  FROM \
// (SELECT id AS color_id FROM api_mapcolorscheme WHERE';
// old.forEach((c, idx) => {
//   const cc = c.toLocaleUpperCase();
//   const id = idx + 1;
//   console.log(`${UP} color = '${cc}') AS foo WHERE color = '${id}';`);
// });
