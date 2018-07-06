import { observable, computed } from 'mobx';

export default class MapPics {
  @observable tileSize = 256;
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

  svgGen(type, store) {
    const data = Object.values(store).filter(c => c.type === type);
    const svg = [];

    svg.push([
      ...this.svgHeaders,
      `width="${this.tileSize}"`,
      `height="${this.tileSize * data.length}"`,
      '>'
    ].join(' '));
    data.map((s, idx) => {
      const position = `x="0" y="${idx * this.tileSize}"`;
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

  jsonGen(type, store, anchor = {}) {
    const data = Object.values(store).filter(c => c.type === type);
    const json = data.reduce((prev, cur, idx) => (
      {
        ...prev,
        [`${type}-${cur.id}`]: {
          x: 0,
          y: this.tileSize * idx,
          width: this.tileSize,
          height: this.tileSize,
          ...anchor,
        }
      }), {});
    return json;
  }

  // @computed get citySVG() {
  //   const svg = [];

  //   svg.push([
  //     ...this.svgHeaders,
  //     `width="${this.cityTileSize}"`,
  //     `height="${this.cityTileSize * 10}"`,
  //     '>'
  //   ].join(' '));
  // }

  @computed get tileDimensions() {
    return `width="${this.tileSize}" height="${this.tileSize}"`;
  }

  @computed get decorations() {
    const data = this.svgGen('decoration', this.rootStore.data.MapPics.data);
    const blob = new Blob([data], { type: 'image/svg+xml' });
    return window.URL.createObjectURL(blob);
  }

  @computed get decorationsJSON() {
    return this.jsonGen('decoration', this.rootStore.data.MapPics.data);
  }

  @computed get events() {
    const data = this.svgGen('event', this.rootStore.data.MapPics.data);
    const blob = new Blob([data], { type: 'image/svg+xml' });
    return window.URL.createObjectURL(blob);
  }

  @computed get eventsJSON() {
    return this.jsonGen('event', this.rootStore.data.MapPics.data);
  }

  @computed get pins() {
    const data = this.svgGen('pin', this.rootStore.data.MapPics.data);
    const blob = new Blob([data], { type: 'image/svg+xml' });
    return window.URL.createObjectURL(blob);
  }

  @computed get pinsJSON() {
    const anc = {
      anchorY: 0,
      anchorX: 0
    };
    return this.jsonGen('pin', this.rootStore.data.MapPics.data, anc);
  }
}
