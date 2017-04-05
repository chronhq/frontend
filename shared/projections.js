import * as d3 from 'd3';

export const getGeoPath = project => d3.geoPath().projection(project);

export const defaultProjectionName = 'Equirectangular';
export const projectionByName = {
  Mercator: d3.geoMercator(),
  Equirectangular: d3.geoEquirectangular(),
  ConicEqualArea: d3.geoConicEqualArea()
};

export const defaultProjectFn = projectionByName[defaultProjectionName];
export const defaultPathFn = getGeoPath(defaultProjectFn);

export function getProjection(options = { name: defaultProjectionName, rotate: [0, 0, 0] }) {
  return projectionByName[options.name].rotate(options.rotate);
}

export function getPath(options = undefined) {
  return getGeoPath(getProjection(options));
}
