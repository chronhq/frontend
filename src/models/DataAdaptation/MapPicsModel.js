import { observable, computed } from 'mobx';

export default class MapPics {
  @observable disableGrid = false;

  @observable downloadLinkId = 'mapPicsDownloadLink';

  @observable powFactor = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
    .map(p => 2 ** p);

  @observable settings = {
    ocean: {},
    event: {},
    pin: {
      anchorY: 0,
      anchorX: 0
    },
    decoration: {},
  }

  @observable filters = Object.keys(this.settings);

  @observable tileSize = 1024;

  @observable cityTileSize = 32;

  @observable svgHeaders = [
    '<?xml version="1.0" encoding="UTF-8" standalone="no"?>',
    '<svg',
    'xmlns:dc="http://purl.org/dc/elements/1.1/"',
    'xmlns:cc="http://creativecommons.org/ns#"',
    'xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"',
    'xmlns:svg="http://www.w3.org/2000/svg"',
    'xmlns="http://www.w3.org/2000/svg"',
    'xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"',
    'version="1.1"',
  ];

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  findFactor(c) {
    // Looking for a power coefficient with min overhead
    return this.powFactor.findIndex(p => p >= c);
  }

  findGrid(f) {
    if (this.disableGrid) return [2 ** f, 1];
    if (f === 0) return [1, 1];
    if (f === 1) return [2, 1];


    const factors = this.powFactor.slice(0, f);
    const v = Math.floor(factors.length / 2);
    if ((factors.length % 2) === 1) {
      return [this.powFactor[v + 1], this.powFactor[v]];
    }
    return [this.powFactor[v], this.powFactor[v]];
  }

  configureGrid(type) {
    const store = this.picsByType[type];
    const f = this.findFactor(store.length);
    const g = this.findGrid(f);
    return {
      grid: g,
      pow: f,
    };
  }

  @computed get picsByType() {
    const { data } = this.rootStore.data.MapPics;
    return this.filters.reduce((prev, cur) => ({
      ...prev,
      [cur]: Object.values(data).filter(c => c.type === cur),
    }), {});
  }

  @computed get gridByType() {
    return this.filters.reduce((prev, cur) => ({
      ...prev,
      [cur]: this.configureGrid(cur)
    }), {});
  }

  @computed get texture() {
    return this.filters.reduce((prev, cur) => {
      const store = this.picsByType[cur];
      const { grid } = this.gridByType[cur];

      const data = this.svgGen(store, grid);
      const map = this.jsonGen(cur, store, this.settings[cur]);

      const img = new Blob([data], { type: 'image/svg+xml' });
      const mapBlob = new Blob([JSON.stringify(map)], { type: 'text/json;charset=UTF-8' });

      const { createObjectURL } = (window.URL ? window.URL : window.webkitURL);
      return {
        ...prev,
        [cur]: {
          img: createObjectURL(img),
          map,
          json: createObjectURL(mapBlob)

        }
      };
    }, {});
  }

  svgGen(data, grid) {
    const svg = [];
    svg.push([
      ...this.svgHeaders,
      `width="${this.tileSize * grid[0]}"`, // x
      `height="${this.tileSize * grid[1]}"`, // y
      '>'
    ].join(' '));
    const cell = [0, 0];
    data.map((s, idx) => {
      cell[0] = (idx) % grid[1];
      cell[1] = Math.floor((idx) / grid[1]);
      const position = `x="${cell[0] * this.tileSize}" y="${cell[1] * this.tileSize}"`;
      svg.push(['\t', '<svg', position, this.tileDimensions, `viewBox="${s.viewbox}"`,
        'preserveAspectRatio="xMinYMid meet"', '>'].join(' '));
      s.g.map((g) => {
        const style = [];
        Object.keys(g.style).map(k => style.push(`${k}:${g.style[k]}`));
        svg.push(`\t\t<path d="${g.d}" style="${style.join(';')}" />`);
        return false;
      });
      svg.push('\t</svg>');
      return false;
    });
    svg.push('</svg>');
    return svg.join('\n');
  }

  jsonGen(type, data, anchor = {}) {
    const { grid } = this.gridByType[type];
    const cell = [0, 0];
    const json = data.reduce((prev, cur, idx) => {
      cell[0] = (idx) % grid[1];
      cell[1] = Math.floor((idx) / grid[1]);
      const res = {
        x: cell[0] * this.tileSize,
        y: cell[1] * this.tileSize,
        width: this.tileSize,
        height: this.tileSize,
        ...anchor,
      };
      return {
        ...prev,
        [`${type}-${cur.id}`]: res
      };
    }, {});
    return json;
  }

  download(type, map = true) {
    const key = map === true ? 'json' : 'img';
    // key === map | img
    const fileData = this.texture[type][key];

    const filename = key === 'img' ? `${type}.svg` : `${type}.json`;

    // Not working in IE (it's a debug only feature)
    const targetA = document.getElementById(this.downloadLinkId);
    targetA.href = fileData;
    targetA.download = filename;
    targetA.click();
  }

  downloadAll() {
    Object.keys(this.texture).map((t) => {
      this.download(t, false);
      this.download(t, true);
      return null;
    });
  }

  @computed get tileDimensions() {
    return `width="${this.tileSize}" height="${this.tileSize}"`;
  }
}
