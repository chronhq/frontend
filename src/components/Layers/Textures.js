import citiesAtlas from './geoAssets/cities.svg';
import citiesMapping from './geoAssets/cities.json';

import decorationAtlas from './geoAssets/decoration.svg';
import decorationMapping from './geoAssets/decoration.json';

import eventAtlas from './geoAssets/event.svg';
import eventMapping from './geoAssets/event.json';

import oceanAtlas from './geoAssets/ocean.svg';
import oceanMapping from './geoAssets/ocean.json';

import pinAtlas from './geoAssets/pin.svg';
import pinMapping from './geoAssets/pin.json';

export default {
  cities: {
    map: citiesMapping,
    img: citiesAtlas
  },
  decoration: {
    map: decorationMapping,
    img: decorationAtlas
  },
  event: {
    map: eventMapping,
    img: eventAtlas
  },
  ocean: {
    map: oceanMapping,
    img: oceanAtlas
  },
  pin: {
    map: pinMapping,
    img: pinAtlas
  },
};
