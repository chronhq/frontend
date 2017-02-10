import fs from 'fs';
import sizeof from 'object-sizeof';
import * as d3 from 'd3';


const wrapMessage = str => `${Date.now()} => ${str}`;

export const logger = {
  err: str => console.error(wrapMessage(str)),
  info: str => console.info(wrapMessage(str)),
  log: str => console.error(wrapMessage(str)),
  json: str => console.log(wrapMessage(JSON.stringify(str)))
};

export function printSize(obj, str) {
  const objSize = Math.round(sizeof(obj) / 8.192) / 100;
  logger.info(`${objSize}Kb  ${str}`);
}

export function returnPlainData(content) {
  return content;
}

export function parseJsonData(content) {
  let data = '';
  try {
    data = JSON.parse(content);
  } catch (err) {
    logger.err('ERROR: Error parsing your json');
    logger.err(err);
  }
  printSize(data, 'Parsed JSON');
  return data;
}

export function readDataFile(filename, parse = parseJsonData) {
  let content;
  try {
    content = fs.readFileSync(filename);
  } catch (err) {
    logger.err(err);
  }
  printSize(content, `Content from file ${filename}`);
  return parse(content);
}

export function getProjection() {
  return d3.geoConicEqualArea();
}
export function getPath() {
  return d3.geoPath().projection(getProjection());
}
