import { IconLayer } from '@deck.gl/layers';
import Textures from './Textures';

function cityPointsLayer(cities, visible, deck) {
  const { showCluster, sizeScale, rZoom: z } = deck;
  return new IconLayer({
    id: 'city-points-layer',
    data: cities,
    visible,
    pickable: true,
    iconAtlas: Textures.cities.img,
    iconMapping: Textures.cities.map,
    // sizeScale: ICON_SIZE * size * window.devicePixelRatio,
    sizeScale,
    getPosition: d => [d.x, d.y],
    getIcon: (d) => {
      if (d.zoomLevels[z] !== null) {
        return d.zoomLevels[z].icon;
      }
      return null;
    },
    getSize: d => (showCluster ? d.zoomLevels[z] && d.zoomLevels[z].size : 1),
    updateTriggers: {
      getIcon: z,
      getSize: z
    },
    onClick: d => console.log('info:', d)
  });
}

export default cityPointsLayer;
