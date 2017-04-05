export const wrapMessage = str => `${Date.now()} => ${str}`;

export const logger = {
  err: str => console.error(wrapMessage(str)),
  info: str => console.info(wrapMessage(str)),
  log: str => console.error(wrapMessage(str)),
  json: str => console.log(wrapMessage(JSON.stringify(str)))
};
