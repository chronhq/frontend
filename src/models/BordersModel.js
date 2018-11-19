import {
  computed
} from 'mobx';
import { getActualData } from './DataAdaptation/_helper';


export default class BordersModel {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.data = this.rootStore.data;
  }

  @computed get actualData() {
    const data = getActualData(
      this.allYears,
      this.byYear,
      this.rootStore.year.now
    );
    if (Array.isArray(data)) {
      return data;
    }
    return data.geoProps;
  }

  // Borders Timeline
  @computed get byYear() {
    return this.rootStore.data.Borders.data;
  }

  @computed get geomBBoxes() {
    return this.rootStore.data.GeomBBoxes.data;
  }

  @computed get allYears() {
    return Object.keys(this.byYear);
  }

  @computed get styleFeatures() {
    const properties = this.rootStore.properties.data;
    return this.actualData.map(cur => ({
      color: (cur.props in properties
        ? properties[cur.props].color
        : [0, 0, 0, 0]),
      id: cur.geo,
      props: cur.props,
    }));
  }

  @computed get loadingStatus() {
    return true;
    // should use some triggers from mapbox api

    // return this.ready
    //   ? this.rootStore.i18n.data.loadingWidget.loaded
    //   : this.rootStore.i18n.data.loadingWidget.loading;
  }

  @computed get styleInfo() {
    return this.styleFeatures.reduce((prev, cur) => {
      // skip source if it does not have bbox or bbox is still loading
      if (typeof this.geomBBoxes[cur.id] === 'undefined') {
        return prev;
      }
      const name = `geom-${cur.id}`;
      const source = {
        type: 'vector',
        bounds: this.geomBBoxes[cur.id].bounds,
        tiles: [`http://localhost:3000/mvt/${cur.id}/{z}/{x}/{y}`]
      };

      const layer = {
        id: name,
        source: name,
        type: 'fill',
        paint: {
          'fill-color': `rgba(${cur.color})`,
        },
        'source-layer': name
      };
      return {
        sources: { ...prev.sources, [name]: source },
        layers: [...prev.layers, layer]
      };
    }, { sources: {}, layers: [] });
  }

  @computed get style() {
    return {
      version: 8,
      name: 'maps',
      metadata: {
        'mapbox:autocomposite': true,
        'mapbox:type': 'template',
        'mapbox:sdk-support': {
          js: '0.49.0',
          android: '6.5.0',
          ios: '4.4.0'
        }
      },
      ...this.styleInfo,
      center: [0, 0],
      zoom: 1,
      bearing: 0,
      pitch: 0,
      owner: 'miklergm',
      visibility: 'private'
    };
  }
}
