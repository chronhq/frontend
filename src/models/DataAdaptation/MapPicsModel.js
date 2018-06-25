import { observable, computed } from 'mobx';

export default class MapPics {
  @observable tileSize = 256;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  svgGen(type, store) {
    const data = Object.values(store).filter(c => c.type === type);
    const svg = [];
    svg.push('<?xml version="1.0" encoding="UTF-8" standalone="no"?>');

    svg.push([
      '<svg',
      `width="${this.tileSize}"`,
      `height="${this.tileSize * data.length}"`,
      'xmlns:dc="http://purl.org/dc/elements/1.1/"',
      'xmlns:cc="http://creativecommons.org/ns#"',
      'xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"',
      'xmlns:svg="http://www.w3.org/2000/svg"',
      'xmlns="http://www.w3.org/2000/svg"',
      'xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"',
      'xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"',
      'version="1.1"',
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

  jsonGen(type, store) {
    const data = Object.values(store).filter(c => c.type === type);
    const json = data.reduce((prev, cur, idx) => (
      {
        ...prev,
        [`${type}-${cur.id}`]: {
          x: 0,
          y: this.tileSize * idx,
          width: this.tileSize,
          height: this.tileSize,
        }
      }), {});
    return json;
  }

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
    return this.jsonGen('pin', this.rootStore.data.MapPics.data);
  }
}
