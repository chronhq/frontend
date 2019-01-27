/*
 * Chron.
 * Copyright (c) 2019 Alisa Belyaeva, Ata Ali Kilicli, Amaury Martiny,
 * Daniil Mordasov, Liam O’Flynn, Mikhail Orlov.
 * -----
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * -----
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * -----
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
const path = require('path');
const fs = require('fs');

const pinsSrcPath = path.join(__dirname, 'pins');
const pinsOutPath = path
  .normalize(path.join(__dirname, '../components/Layers/geoAssets'));
const mapPicsOutPath = path
  .normalize(path.join(__dirname, '../containers/Widgets/mapPics.json'));

// console.log(__dirname, pinsSrcPath, pinsOutPath);

const files = fs.readdirSync(pinsSrcPath);
const res = files.reduce((prev, cur) => {
  const [y, x, id, box, name] = cur.split('_');
  const file = fs.readFileSync(path.join(pinsSrcPath, cur), 'UTF-8')
    .split('\n')
    .filter(f => !(f.match(/<\?xml/)))
    .map(m => m.replace('\r', ''));

  const paths = file.filter(f => f.match(/<path/)).map((p) => {
    const style = p.match(/style="([\w.,:;#\s-]+)"/)[1]
      .split(';').reduce((pp, c) => {
        const [k, v] = c.split(':');
        return { ...pp, [k]: v };
      }, {});
    try {
      const d = p.match(/d="([\w.,\s-]+)"/)[1];
      return { d, style };
    } catch (e) {
      console.error('SVG Parsing error');
      console.error(p);
      console.error(p.match(/d="([\w\d.\s-]+)"/));
      return { d: '', style };
    }
  });

  return [
    ...prev,
    {
      x, y, id, box, name, file, paths
    }];
}, []);

const pinsJson = res.reduce((prev, cur) => ({
  ...prev,
  [`pin-${cur.id}`]: {
    x: cur.x * 1024,
    y: cur.y * 1024,
    width: 1024,
    height: 1024,
    anchorY: 0,
    anchorX: 0
  }
}), {});

const pinsSvg = res.map(m => ([
  `<svg width="1024" height="1024" x="${m.x * 1024}" y="${m.y * 1024}">`,
  ...m.file,
  '</svg>'
].join('\n'))).join('\n');

const mapPicsJson = res.reduce((prev, m) => ({
  ...prev,
  [m.id]: {
    id: m.id,
    viewbox: `0 0 ${m.box} ${m.box}`,
    g: m.paths
  }
}), {});

fs.writeFileSync(path.join(pinsOutPath, 'pin.json'), JSON.stringify(pinsJson));

fs.writeFileSync(path.join(pinsOutPath, 'pin.svg'), [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<svg width="4096" height="4096" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">',
  pinsSvg,
  '</svg>'
].join('\n'));

fs.writeFileSync(mapPicsOutPath, JSON.stringify(mapPicsJson));
