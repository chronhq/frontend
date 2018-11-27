import {
  computed, observable, action, runInAction
} from 'mobx';

import settings from '../../settings.json';

const BODY = {
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
  center: [0, 0],
  zoom: 1,
  bearing: 0,
  pitch: 0,
};

export default class MapStyleModel {
  @observable desiredMapBoxStyle;

  @observable installedMapBoxStyle;

  @observable accessToken = settings.mapbox.token;

  @observable backgroundStyle = { ...BODY, sources: {}, layers: [] };

  @computed get style() {
    const sources = (typeof this.backgroundStyle.sources !== 'undefined')
      ? {
        ...this.backgroundStyle.sources,
        ...this.rootStore.borders.styleInfo.sources
      }
      : this.rootStore.borders.styleInfo.sources;

    const layers = (typeof this.backgroundStyle.layers !== 'undefined')
      ? [
        ...this.backgroundStyle.layers,
        ...this.rootStore.borders.styleInfo.layers
      ]
      : this.rootStore.borders.styleInfo.layers;

    return {
      ...this.backgroundStyle,
      sources,
      layers,
    };
  }

  @computed get styleInSync() {
    return this.desiredMapBoxStyle === this.installedMapBoxStyle;
  }

  @computed get backgroundLink() {
    const link = this.desiredMapBoxStyle
      .replace('mapbox://styles', 'https://api.mapbox.com/styles/v1');
    return `${link}?access_token=${this.accessToken}`;
  }

  @action async setUpBackground(styleLink) {
    this.desiredMapBoxStyle = styleLink;
    try {
      const response = await fetch(this.backgroundLink);
      const background = await response.json();

      if (background.version === 8) {
        runInAction(() => {
          this.backgroundStyle = background;
          this.installedMapBoxStyle = styleLink;
        });
      } else {
        const error = {
          message: JSON.stringify(background),
          name: 'MapStyleModel background style fetch failed',
        };
        throw error;
      }
    } catch (e) {
      console.error(e);
    }
  }

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.setUpBackground(settings.mapbox.style);
  }
}
