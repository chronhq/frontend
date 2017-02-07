import fs from 'fs';
import sizeof from 'object-sizeof';

export const LOG = 'log';
export const ERR = 'err';
export const INFO = 'info';

export function logger(str, lvl = LOG) {
  const log = `${Date.now()} => ${str}`;
  switch (lvl) {
    case ERR:
      console.error(log);
      break;
    case INFO:
      console.info(log);
      break;
    default:
      console.log(log);
  }
}
export function printSize(obj, str) {
  const objSize = Math.round(sizeof(obj) / 8.192) / 100;
  logger(`${objSize}Kb  ${str}`, INFO);
}

export function returnPlainData(content) {
  return content;
}

export function parseJsonData(content) {
  let data = '';
  try {
    data = JSON.parse(content);
  } catch (err) {
    logger('ERROR: Error parsing your json', ERR);
    logger(err, ERR);
  }
  printSize(data, 'Parsed JSON');
  return data;
}

export function readDataFile(filename, parse = parseJsonData) {
  let content;
  try {
    content = fs.readFileSync(filename);
  } catch (err) {
    logger(err, ERR);
  }
  printSize(content, `Content from file ${filename}`);
  return parse(content);
}
