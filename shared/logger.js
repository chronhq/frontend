export const wrapMessage = str => `${Date.now()} => ${str}`;

const dummyOut = () => null;

const debugLogger = {
  err: str => console.error(wrapMessage(str)),
  info: str => console.info(wrapMessage(str)),
  log: str => console.log(wrapMessage(str)),
  json: str => console.log(wrapMessage(JSON.stringify(str)))
};

const prodLogger = {
  err: str => console.error(wrapMessage(str)),
  info: dummyOut,
  log: dummyOut,
  json: dummyOut
};

const logger = process.env.NODE_ENV === 'production' ? prodLogger : debugLogger;

export { logger };
